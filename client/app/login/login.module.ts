import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { RouterModule } from '@angular/router';
import { LogInService } from './services/login.service';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
    declarations: [LoginComponent, RecoverPasswordComponent, NewAccountComponent],
    imports: [CommonModule, LoginRoutingModule, FormsModule, RouterModule, ReactiveFormsModule],
    providers: [LogInService, AngularFireAuth]
})
export class LoginModule { }
