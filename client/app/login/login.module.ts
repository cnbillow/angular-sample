import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './containers/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

@NgModule({
    declarations: [LoginComponent, RecoverPasswordComponent, NewAccountComponent],
    imports: [
        AngularFireModule,
        CommonModule,
        SharedModule,
        LoginRoutingModule, FormsModule, RouterModule, ReactiveFormsModule],
    providers: [ AngularFireAuth ],
    entryComponents: [RecoverPasswordComponent]
})
export class LoginModule { }
