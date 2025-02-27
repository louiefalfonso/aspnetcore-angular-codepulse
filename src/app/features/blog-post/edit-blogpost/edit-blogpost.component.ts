import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.models';
import { CategoryService } from '../../category/services/category.service';
import { MarkdownComponent } from 'ngx-markdown';
import { UpdateBlogPostRequest } from '../models/update-blog-post-request.models';


@Component({
  selector: 'app-edit-blogposts',
  imports: [RouterModule, FormsModule, CommonModule, MarkdownComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent  implements OnInit, OnDestroy{

   // add id property
   id : string | null = null;
   model?: BlogPost;
   categories$?: Observable<Category[]>
   selectedCategories?: string[];

  // add subscriptions
  routeSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?:Subscription;

   // add alertMessage and alertType
  alertMessage: string = '';
  alertType: string = '';

  // add blog post object
  blogPost?:BlogPost;

  // add constructor and inject the necessary services
  constructor(
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private route : ActivatedRoute,) { }


 // implement ngOnInit
  ngOnInit(): void {

  //get all categories  
  this.categories$ = this.categoryService.getAllCategories();

  // get all id of the blog post to edit
  this.routeSubscription = this.route.paramMap.subscribe({
     next : (params) =>{
      this.id = params.get('id');
      if(this.id){
        this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
          next: (response) =>{
            this.model = response;
            this.selectedCategories = response.categories.map(x => x.id);
          }
        });
      }

     }
   })
  }

  // implement onFormSubmit
  onFormSubmit():void{
    if(this.model && this.id){
      var updateBlogPost: UpdateBlogPostRequest ={
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories:this.selectedCategories??[]
      };
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          this.alertMessage = 'Blog Post Updated Successfully';
          this.alertType = 'success';
          this.router.navigate(['/admin/blogposts'], {
            state: { alertMessage: this.alertMessage, alertType: this.alertType }
          });
        },
        error: (error) => {
          console.error(error);
          alert('An error occurred while updating the blog post');
        }
      });
    }
  }

  // implement onDelete
  onDelete(): void {
    if(this.id){
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: ()=>{
          this.alertMessage = 'Blog Post Deleted Successfully';
          this.alertType = 'danger';
          this.router.navigate(['/admin/blogposts'], {
            state: { alertMessage: this.alertMessage, alertType: this.alertType }
          });
        },
        error: (error) => {
          console.error(error);
          alert('An error occurred while deleting the category');
        }
      });
    }
  }


  // implement ngOnDestroy
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }


}
