import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  entries = [
    {
      name: 'Login',
      link: 'login',
    },
    {
      name: 'Register',
      link: 'register',
    },
    {
      name: 'Update Profile',
      link: 'update-profile',
    },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(value: string): void {
    this.router.navigate(['../', value]);
  }
}
