import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';


@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // add Observables
  blogs$?: Observable<BlogPost[]>;

  // create constructor
  constructor(private blogPostService: BlogPostService){}

  // implement OnInit lifecycle hook
  ngOnInit(): void {
  this.blogs$ = this.blogPostService.getAllBlogPosts();
  }


}
