import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user-data.interface';
import { File } from '../../models/util.interface';

@Component({
  selector: 'app-update-user-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss'],
})
export class UpdateUserProfileComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: ElementRef;
  URL = environment.url + environment.BASE_URL;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  form = this.formBuilder.group({
    id: [{ value: null, disabled: true }, [Validators.required]],
    name: [null, [Validators.required]],
    username: [null, [Validators.required]],
    profileImage: [null],
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.authService
      .getUserId()
      .pipe(
        switchMap((id: number = -1) =>
          this.userService.findUser(id).pipe(
            tap((user: User) => {
              this.form.patchValue({
                id: user.id,
                name: user.name,
                username: user.username,
                profileImage: user.profileImage,
              });
            })
          )
        )
      )
      .subscribe();
  }

  update(): void {
    this.userService.updateUser(this.form.getRawValue()).subscribe();
  }

  onClick(): void {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file.data = fileInput.files[0];
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }

  uploadFile(): void {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.userService
      .uploadProfileImage(formData)
      .pipe(
        map(
          (event) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                this.file.progress = Math.round(
                  event.total ? (event.loaded * 100) / event.total : 0
                );
                break;
              case HttpEventType.Response:
                return event;
            }
          },
          catchError(() => {
            this.file.inProgress = false;
            return of('Upload Failed');
          })
        )
      )
      .subscribe((event) => {
        if (typeof event === 'object') {
          this.form.get('profileImage')?.setValue(event.body.profileImage);
        }
      });
  }
}
