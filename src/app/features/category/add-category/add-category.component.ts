import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.models';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

 model: AddCategoryRequest;

 constructor(private categoryService: CategoryService){
   this.model = {
    name: '',
    urlHandle: ''
   }
 }
 
  onFormSubmit(){
    console.log(this.model);
  }
}
