import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [LoginComponent, RecoverPasswordComponent, NewAccountComponent],
    imports: [CommonModule, LoginRoutingModule, FormsModule, RouterModule],
})
export class LoginModule { }
