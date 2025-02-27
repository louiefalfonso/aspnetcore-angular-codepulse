import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})

export class AddCategoryComponent implements OnDestroy {

 // add model
 model: AddCategoryRequest;

 // add unsubcribe from observables
 private addCategorySubscription ?: Subscription;

  // add alertMessage and alertType
 alertMessage: string = '';
 alertType: string = '';

 // add constructor
 constructor(
  private categoryService: CategoryService, 
  private http: HttpClient, 
  private router: Router ) {
   this.model = {
    name: '',
    urlHandle: ''
   }
 }

 // add onFormSubmit
 onFormSubmit() {
  this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (response) => {
        this.alertMessage = 'Category Added Successfully';
        this.alertType = 'success';
        setTimeout(() => {
          this.alertMessage = '';
          this.alertType = '';
          this.router.navigate(['/admin/categories']);
        }, 2000);
      },
      error: (error) => {
        console.error(error);
        this.alertMessage = 'An error occurred while adding the category';
        this.alertType = 'danger';
        setTimeout(() => {
          this.alertMessage = '';
          this.alertType = '';
          this.router.navigate(['/admin/categories']);
        }, 2000);
      }
    });
}

  ngOnDestroy(): void {
   this.addCategorySubscription?.unsubscribe();
  }
 
}
