// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// project Import
import { ToastsRoutingModule } from './toasts-routing.module';
import { ToastsComponent } from './toasts.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { ToastContainerDirective, ToastNoAnimationModule, ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [ToastsComponent],
  imports: [
    CommonModule,
    ToastsRoutingModule,
    SharedModule,
    ToastContainerDirective,
    ToastNoAnimationModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [ToastrService]
})
export class ToastsModule {}
