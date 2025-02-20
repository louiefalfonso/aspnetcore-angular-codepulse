import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  // add constructor
  constructor(private http: HttpClient) { }

  // add category
  addCategory(model : AddCategoryRequest) : Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/categories`, model);
  }

  // get all categories
  getAllCategories(): Observable<Category[]>{
     return this.http.get<Category[]>(`${environment.apiBaseUrl}/categories`);
  }

  // get category by id
  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(`${environment.apiBaseUrl}/categories/${id}`);
  }
 
}
