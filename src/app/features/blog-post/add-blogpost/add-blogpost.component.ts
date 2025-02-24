import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule,CommonModule, MarkdownComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})

export class AddBlogpostComponent implements OnDestroy {

  // add model
  model: AddBlogPost;

  // add unsubcribe from observables
  private addBlogPostSubscription ?: Subscription;

  // add alertMessage and alertType
 alertMessage: string = '';
 alertType: string = '';

  // add constructor
  constructor(
    private blogPostService: BlogPostService, 
    private http: HttpClient,
    private router: Router) {
      this.model = {
        title: '',
        shortDescription: '',
        content: '',
        featuredImageUrl: '',
        urlHandle: '',
        author: '',
        publishedDate: new Date(),
        isVisible: true,
        categories: []
      }
  }


  // add onFormSubmit
  onFormSubmit(){
  this.addBlogPostSubscription = this.blogPostService.addBlogPost(this.model)
   .subscribe({
      next: (response) => {
        this.alertMessage = 'Blog Post Added Successfully';
        this.alertType = 'success';
        this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        console.error(error);
        this.alertMessage = 'An error occurred while adding the blog post';
        this.alertType = 'danger';
      }
   });
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }

}
