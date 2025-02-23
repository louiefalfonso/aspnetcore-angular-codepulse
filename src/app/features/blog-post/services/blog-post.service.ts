import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BlogPost } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  // add constructor
   constructor(private http: HttpClient) { }

  // add blog post
  addBlogPost(data : AddBlogPost) : Observable<BlogPost>{
    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/blogpost`, data);
  }

  // get all blog posts
  getAllBlogPosts(): Observable<BlogPost[]>{
     return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/blogpost`);
  }
}
