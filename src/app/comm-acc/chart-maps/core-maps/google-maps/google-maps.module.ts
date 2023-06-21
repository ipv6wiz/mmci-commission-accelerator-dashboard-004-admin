// Angular Import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { GoogleMapsRoutingModule } from './google-maps-routing.module';
import { GoogleMapsComponent } from './google-maps.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgMapsCoreModule } from '@ng-maps/core';
import { NgMapsGoogleModule, GOOGLE_MAPS_API_CONFIG } from '@ng-maps/google';

// third party

@NgModule({
  declarations: [GoogleMapsComponent],
  imports: [CommonModule, GoogleMapsRoutingModule, SharedModule, NgMapsCoreModule, NgMapsGoogleModule],
  providers: [
    {
      provide: GOOGLE_MAPS_API_CONFIG,
      useValue: {
        apiKey: 'YOUR_API_KEY'
      }
    }
  ]
})
export class GoogleMapsModule {}
