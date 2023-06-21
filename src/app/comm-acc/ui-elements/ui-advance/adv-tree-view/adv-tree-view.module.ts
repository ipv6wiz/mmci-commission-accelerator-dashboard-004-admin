// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

// project Import
import { AdvTreeViewRoutingModule } from './adv-tree-view-routing.module';
import { AdvTreeViewComponent } from './adv-tree-view.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [AdvTreeViewComponent],
  imports: [
    CommonModule,
    AdvTreeViewRoutingModule,
    SharedModule,
    MatTreeModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    MatNativeDateModule,
    MatRippleModule
  ]
})
export class AdvTreeViewModule {}
