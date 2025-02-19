import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  // add constructor
  constructor(private http: HttpClient) { }

  // add addCategory
  addCategory(model : AddCategoryRequest) : Observable<void>{
    return this.http.post<void>(`https://localhost:7027/api/v1/categories`, model);
  }
 
}
