// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvTreeViewComponent } from './adv-tree-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdvTreeViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvTreeViewRoutingModule {}
