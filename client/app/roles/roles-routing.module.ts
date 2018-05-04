import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './containers';

const routes: Routes = [
    { path: '', component: RolesComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RolesRoutingModule {}
