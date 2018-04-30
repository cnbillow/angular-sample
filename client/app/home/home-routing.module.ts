import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { UsersComponent } from '../users/users.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: '', loadChildren: '../users/users.module#UsersModule' },
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
