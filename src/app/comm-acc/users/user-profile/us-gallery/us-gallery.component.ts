// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { Image, ModalGalleryService, ModalLibConfig } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-us-gallery',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './us-gallery.component.html',
  styleUrls: ['./us-gallery.component.scss']
})
export class UsGalleryComponent {
  // public props
  imageIndex = 0;
  images: Image[] = [
    new Image(0, {
      img: 'assets/images/light-box/sl1.jpg',
      extUrl: 'http://www.google.com'
    }),
    new Image(1, {
      img: 'assets/images/light-box/sl2.jpg',
      description: 'Description 2'
    }),
    new Image(2, {
      img: 'assets/images/light-box/sl3.jpg',
      description: 'Description 3'
    }),
    new Image(3, {
      img: 'assets/images/light-box/sl4.jpg',
      description: 'Description 4',
      extUrl: 'http://www.google.com'
    }),
    new Image(4, {
      img: 'assets/images/light-box/sl5.jpg',
      description: 'Description 5',
      extUrl: 'http://www.google.com'
    }),
    new Image(5, {
      img: 'assets/images/light-box/sl6.jpg',
      description: 'Description 6',
      extUrl: 'http://www.google.com'
    })
  ];

  // constructor
  constructor(private modalGalleryService: ModalGalleryService) {}

  // public method
  openModal(id: number, imagesArrayToUse: Image[], imageIndex: number, libConfig?: ModalLibConfig): void {
    if (imagesArrayToUse.length === 0) {
      console.error('Cannot open modal-gallery because images array cannot be empty');
      return;
    }
    if (imageIndex > imagesArrayToUse.length - 1) {
      console.error('Cannot open modal-gallery because imageIndex must be valid');
      return;
    }
    const imageToShow: Image = imagesArrayToUse[imageIndex];
    this.modalGalleryService.open({
      id,
      images: imagesArrayToUse,
      currentImage: imageToShow,
      libConfig
    });
  }

  Images = [
    {
      src: 'assets/images/light-box/sl1.jpg'
    },
    {
      src: 'assets/images/light-box/sl2.jpg'
    },
    {
      src: 'assets/images/light-box/sl3.jpg'
    },
    {
      src: 'assets/images/light-box/sl4.jpg'
    },
    {
      src: 'assets/images/light-box/sl5.jpg'
    },
    {
      src: 'assets/images/light-box/sl6.jpg'
    }
  ];
}
