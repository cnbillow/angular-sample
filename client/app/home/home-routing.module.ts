import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'users', loadChildren:
            '../user-management/user-management.module#UserManagementModule' },
            { path: 'roles', loadChildren: '../roles/roles.module#RolesModule' },
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
