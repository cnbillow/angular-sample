import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login.component';
import { NewAccountComponent } from './components/new-account/new-account.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'create', component: NewAccountComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
