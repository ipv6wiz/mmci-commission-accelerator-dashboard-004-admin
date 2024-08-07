// Angular Import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../theme/shared/_helpers";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'analytics',
                loadComponent: () => import('./dash-analytics/dash-analytics.component'),
                canActivate: [AuthGuard],
                data: {roles: []}
            },
            {
                path: 'sale',
                loadComponent: () => import('./dash-sale/dash-sale.component'),
                canActivate: [AuthGuard],
                data: {roles: []}
            },
            {
                path: 'users',
                loadComponent: () => import('./dash-users/dash-users.component'),
                canActivate: [AuthGuard],
                data: {roles: ['UsersAdmin']}
            },
            {
                path: 'clients',
                loadComponent: () => import('./dash-clients/dash-clients.component'),
                canActivate: [AuthGuard],
                data: {roles: ['ClientsAdmin']}
            },
            {
                path: 'funds',
                loadComponent: () => import('./dash-funds/dash-funds.component'),
                canActivate: [AuthGuard],
                data: {roles: ['FundsAdmin']}
            },
            {
                path: 'ledgers',
                loadComponent: () => import('./dash-ledgers/dash-ledgers.component'),
                canActivate: [AuthGuard],
                data: {roles: ['FundsAdmin']}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
