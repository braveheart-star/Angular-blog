import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BlogService } from 'src/app/services/blogs/blog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-entries',
  templateUrl: './blog-entries.component.html',
  styleUrls: ['./blog-entries.component.scss'],
})
export class BlogEntriesComponent implements OnInit {
  URL = environment.url + environment.BASE_URL;
  dataSource = this.blogService.indexAll(1, 10);
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {}

  onPaginateChange(event: PageEvent): void {
    let page = event.pageIndex;
    const limit = event.pageSize;
    page = page + 1;
    this.dataSource = this.blogService.indexAll(page, limit);
  }
}
