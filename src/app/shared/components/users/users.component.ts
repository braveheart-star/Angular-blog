import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users/users.service';
import { UserData } from '../../models/user-data.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  filterValue = '';

  dataSource: UserData | null = null;
  displayedColumns = ['id', 'name', 'username', 'email', 'role'];
  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.initDataSouce();
  }

  initDataSouce(): void {
    this.userService
      .findAll(1, 10)
      .pipe(tap((userData) => (this.dataSource = userData)))
      .subscribe();
  }

  onPaginateChange(event: PageEvent): void {
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    if (!this.filterValue) {
      this.userService
        .findAll(page, limit)
        .pipe(tap((userData) => (this.dataSource = userData)))
        .subscribe();
    } else {
      this.userService
        .findByUsername(page, limit, this.filterValue)
        .pipe(tap((userData) => (this.dataSource = userData)))
        .subscribe();
    }
  }

  findByName(username: string): void {
    this.userService
      .findByUsername(1, 10, username)
      .pipe(tap((userData) => (this.dataSource = userData)))
      .subscribe();
  }

  navigateToProfile(id: number): void {
    this.router.navigate(['users', id]);
  }
}
