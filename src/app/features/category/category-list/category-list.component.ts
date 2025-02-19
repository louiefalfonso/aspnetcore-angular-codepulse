import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.models';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-category-list',
  imports: [RouterModule, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})

export class CategoryListComponent implements OnInit {

  // use asnyc pipe instead of subscription
  categories$?: Observable<Category[]>;

  constructor(private categoryService: CategoryService){ 
  }

  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories();
  }
}
