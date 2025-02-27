import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit {

  // use asnyc pipe instead of subscription
  blogPosts$?: Observable<BlogPost[]>;

  // add constructor
  constructor(
    private BlogPostService: BlogPostService) { }

  // add ngOnInit
  ngOnInit(): void {
   this.blogPosts$ = this.BlogPostService.getAllBlogPosts();
  }
}
