import { Injectable } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blog-post-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BlogPost } from '../models/blog-post.model';
import { UpdateBlogPostRequest } from '../models/update-blog-post-request.models';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  // add constructor
   constructor(private http: HttpClient) { }

  // add blog post
  addBlogPost(model: AddBlogPostRequest) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/blogposts`, model);
  }

  // get all blog posts
  getAllBlogPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/blogposts`);
 }

  // get blog post by ID
  getBlogPostById(id: string) : Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/blogposts/${id}`);
  }

  // update blog post
  updateBlogPost(id: string, updateBlogPostRequest : UpdateBlogPostRequest): Observable<BlogPost>{
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/blogposts/${id}`, updateBlogPostRequest);
  }

  // delete blog post
  deleteBlogPost(id: string) : Observable<BlogPost>{
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/blogposts/${id}`);
  }
}