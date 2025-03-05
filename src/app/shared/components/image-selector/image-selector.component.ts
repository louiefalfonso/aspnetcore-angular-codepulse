import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';

@Component({
  selector: 'app-image-selector',
  imports: [FormsModule,CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit, OnDestroy {

  // add properties
  private file?: File;
  fileName: string ='';
  title: string ='';
  images$?: Observable<BlogImage[]>;

  // access the form outside
 @ViewChild('form',{static : false}) imageUploadForm?: NgForm;

  // add subscriptions
  uploadImageSubscription?: Subscription;

  // add constructor and inject the necessary services
  constructor(private imageServicer: ImageService){}


  ngOnInit(): void {
  this.getImages();
  }

  onFileUploadChange(event:Event): void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  selectImage(image: BlogImage): void{
    this.imageServicer.selectImage(image);
  }

  uploadImage(): void{
    if (this.file && this.fileName!== '' && this.title !== '') {
    this.uploadImageSubscription = this.imageServicer.uploadImage(this.file, this.fileName, this.title).subscribe(
        {
          next: (response) => {
            this.imageUploadForm?.reset();
            this.getImages();
            },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }

  getImages(){
    this.images$ = this.imageServicer.getAllImages();
  }

  ngOnDestroy(): void {
    this.uploadImageSubscription?.unsubscribe();
  }
}
