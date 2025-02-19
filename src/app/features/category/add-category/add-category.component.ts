import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})

export class AddCategoryComponent {

 // add model
 model: AddCategoryRequest;

 // add constructor
 constructor(private categoryService: CategoryService, private http: HttpClient) {
   this.model = {
    name: '',
    urlHandle: ''
   }
 }
 
 // add onFormSubmit
  onFormSubmit(){
    this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        alert('Category Added Successfully');
      },
      error: (error) => {
        console.error(error);
        alert('An error occurred while adding the category');
      }
    });
  }
}
