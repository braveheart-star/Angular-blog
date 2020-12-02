import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from '../../models/user-data.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userId: number | null = null;
  private sub!: Subscription;
  user: User = {};
  URL  = environment.url + environment.BASE_URL;
  constructor(
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.userId = Number(params.id);
      this.userService
        .findUser(this.userId)
        .pipe(tap((user) => (this.user = user)))
        .subscribe();
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
