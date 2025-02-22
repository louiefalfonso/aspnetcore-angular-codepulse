import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateCategoryRequest } from '../models/update-category-request.models';

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
  editCategorySubscription?: Subscription;

  // add alertMessage and alertType

  private _alertMessage: string = '';
  public get alertMessage(): string {
    return this._alertMessage;
  }
  public set alertMessage(value: string) {
    this._alertMessage = value;
  }
 alertMessage: string = '';

  // add category object
  category?: Category;

  // add constructor and inject the necessary services
  constructor(
    private categoryService: CategoryService,
     private router: Router,
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
    const updateCategoryRequest: UpdateCategoryRequest = {
      name : this.category?.name ?? '',
      urlHandle : this.category?.urlHandle ?? ''
    }

    //pass this object to the service
    if(this.id){
     this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest).subscribe({
        next: () => {
          this.alertMessage = 'Category Updated Successfully';
          this.alertType = 'success';
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.error(error);
          alert('An error occurred while updating the category');
        }
      });
    }

 // implement onDelete
  onDelete(): void {
    if (this.id){
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: () => {
          this.alertMessage = 'Category Deleted Successfully';
          this.alertType = 'success';
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.error(error);
          alert('An error occurred while deleting the category');
        }
      });
    }

  // implement ngOnDestroy
  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe
  }

}
