// angular import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SweetAlertRoutingModule } from './sweet-alert-routing.module';
import { SweetAlertComponent } from './sweet-alert.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { SweetAlert2Module, SweetAlert2LoaderService } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [SweetAlertComponent],
  imports: [CommonModule, SweetAlertRoutingModule, SharedModule, SweetAlert2Module.forRoot()],
  providers: [SweetAlert2LoaderService]
})
export class SweetAlertModule {}
