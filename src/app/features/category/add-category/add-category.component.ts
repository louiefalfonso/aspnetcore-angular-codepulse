import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})

export class AddCategoryComponent implements OnDestroy {

 // add model
 model: AddCategoryRequest;

 // add unsubcribe from observables
 private addCategorySubscription ?: Subscription;

 // add constructor
 constructor(private categoryService: CategoryService, private http: HttpClient) {
   this.model = {
    name: '',
    urlHandle: ''
   }
 }

 // add onFormSubmit
  onFormSubmit(){
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
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

  ngOnDestroy(): void {
   this.addCategorySubscription?.unsubscribe();
  }
 
}
