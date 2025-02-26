import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddBlogPostRequest } from '../models/add-blog-post-request.model';
import { BlogPostService } from '../services/blog-post.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.models';

@Component({
  selector: 'app-add-blogpost',
  imports: [FormsModule,CommonModule, MarkdownComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})

export class AddBlogpostComponent implements OnDestroy, OnInit {

  // add model
  model: AddBlogPostRequest;
  categories$?: Observable<Category[]>;

  // add unsubcribe from observables
  private addBlogPostSubscription ?: Subscription;

  // add alertMessage and alertType
 alertMessage: string = '';
 alertType: string = '';

  // add constructor
  constructor(
    private blogPostService: BlogPostService, 
    private categoryService: CategoryService,
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

  // display all categories
  ngOnInit(): void {
   this.categories$ = this.categoryService.getAllCategories();
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
