import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageService } from './image.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

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

  // add subscriptions
  uploadImageSubscription?: Subscription;

  
   // add alertMessage and alertType
   alertMessage: string = '';
   alertType: string = '';

  // add constructor and inject the necessary services
  constructor(private imageServicer: ImageService){}


  onFileUploadChange(event:Event): void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void{
    if (this.file && this.fileName!== '' && this.title !== '') {

      // use image service to upload the image
      this.imageServicer.uploadImage(this.file, this.fileName, this.title).subscribe(
        {
          next: (response) => {
            console.log(response);
            },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.uploadImageSubscription?.unsubscribe();
  }


}
