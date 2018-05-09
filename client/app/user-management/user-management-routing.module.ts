import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './containers';
import { UserAddEditComponent } from './components';

const routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'add', component: UserAddEditComponent },
    { path: ':id', component: UserAddEditComponent },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserManagementRoutingModule { }
