// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import {AuthGuard} from "./theme/shared/_helpers";
import {AppSiteConfig} from "./app-site-config"

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signin-v2',
        pathMatch: 'full',
        title: AppSiteConfig.siteName
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./comm-acc/dashboard/dashboard.module').then((module) => module.DashboardModule),
          canActivate: [AuthGuard],
          data: {roles: ['UsersAdmin', 'FundsAdmin', 'ClientsAdmin']}
      },
      {
          path: 'lists',
          loadChildren: () => import('./comm-acc/lists/lists.module').then((module) => module.ListsModule),
          canActivate: [AuthGuard],
          data: {roles: ['UsersAdmin', 'FundsAdmin', 'ClientsAdmin']}
      },
      {
        path: 'layout',
        loadChildren: () => import('./comm-acc/pages/layout/layout.module').then((module) => module.LayoutModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'widget',
        loadChildren: () => import('./comm-acc/widget/widget.module').then((module) => module.WidgetModule),
          canActivate: [AuthGuard]
      },
      // {
      //   path: 'users',
      //   loadChildren: () => import('./comm-acc/users/users.module').then((module) => module.UsersModule)
      // },
      {
        path: 'basic',
        loadChildren: () => import('./comm-acc/ui-elements/ui-basic/ui-basic.module').then((module) => module.UiBasicModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'advance',
        loadChildren: () => import('./comm-acc/ui-elements/ui-advance/ui-advance.module').then((module) => module.UiAdvanceModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'forms',
        loadChildren: () => import('./comm-acc/forms/forms.module').then((module) => module.FormsModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./comm-acc/table/tbl-bootstrap/tbl-bootstrap.module').then((module) => module.TblBootstrapModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'tbl-datatable',
        loadComponent: () => import('./comm-acc/table/tbl-datatable/tbl-datatable.component'),
          canActivate: [AuthGuard]
      },
      {
        path: 'charts',
        loadChildren: () => import('./comm-acc/chart-maps/core-chart/core-chart.module').then((module) => module.CoreChartModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'maps',
        loadChildren: () => import('./comm-acc/chart-maps/core-maps/core-maps.module').then((module) => module.CoreMapsModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'email',
        loadChildren: () => import('./comm-acc/application/email/email.module').then((module) => module.EmailModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'task',
        loadChildren: () => import('./comm-acc/application/task/task.module').then((module) => module.TaskModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'todo',
        loadChildren: () => import('./comm-acc/application/todo/todo.module').then((module) => module.TodoModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'gallery',
        loadChildren: () => import('./comm-acc/application/gallery/gallery.module').then((module) => module.GalleryModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'helpdesk',
        loadChildren: () => import('./comm-acc/application/helpdesk/helpdesk.module').then((module) => module.HelpdeskModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'editor',
        loadChildren: () => import('./comm-acc/extension/editor/editor.module').then((module) => module.EditorModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'invoice',
        loadChildren: () => import('./comm-acc/extension/invoice/invoice.module').then((module) => module.InvoiceModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'full-calendar',
        loadChildren: () =>
          import('./comm-acc/extension/full-event-calendar/full-event-calendar.module').then((module) => module.FullEventCalendarModule),
          canActivate: [AuthGuard]
      },
      {
        path: 'file-upload',
        loadComponent: () => import('./comm-acc/extension/file-upload/file-upload.component'),
          canActivate: [AuthGuard]
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./comm-acc/other/sample-page/sample-page.component'),
          canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./comm-acc/pages/authentication/authentication.module').then((module) => module.AuthenticationModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./comm-acc/pages/maintenance/maintenance.module').then((module) => module.MaintenanceModule)
      }
    ]
  },
    {
        path: '**',
        redirectTo: '/auth/signin-v2',
        pathMatch: 'full',
        title: AppSiteConfig.siteName
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
