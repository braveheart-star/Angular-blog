import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  submitLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.auth
      .login(this.loginForm.value)
      .pipe(tap(() => this.router.navigate(['admin'])))
      .subscribe();
  }
}
