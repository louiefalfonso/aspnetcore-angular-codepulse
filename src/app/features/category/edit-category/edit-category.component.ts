import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent  implements OnInit, OnDestroy {

  // add id property
  id : string | null = null;

  // add paramsSubscription
  paramsSubscription?: Subscription;

  // add category object
  category?: Category;

  // use ActivatedRoute to get the id of the category to edit
  constructor(
    private categoryService: CategoryService,
    private route : ActivatedRoute,) { }

  // implement ngOnInit
  ngOnInit(): void {
    // get the id of the category to edit
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id){
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response)=>{
              this.category = response
            },
            error: (error) => {
              console.error(error);
            }
          });
        }
      },
     })
  }

  // implement onFormSubmit
  onFormSubmit():void{
    console.log(this.category);
  }

  // implement ngOnDestroy
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

}
