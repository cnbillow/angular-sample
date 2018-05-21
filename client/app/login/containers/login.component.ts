import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from 'angularfire2/auth';

import { RecoverPasswordComponent } from '../components/recover-password/recover-password.component';
import { AuthService } from '../../services/auth.service';

import { map } from 'rxjs/operators';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    entryComponents: [RecoverPasswordComponent]
})

export class LoginComponent {
    public invalidForm: boolean;
    public myUserGroup: FormGroup;

    constructor(public afAuth: AngularFireAuth,
        public dialog: MatDialog,
        private router: Router,
        private formBuilder: FormBuilder,
        private authService: AuthService) {
        this.authService.isLoggedIn().pipe(map(auth => {
            if (auth) {
                this.router.navigate(['/home']);
                return false;
            }
        })).subscribe();
        this.myUserGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
        });
    }

    public loginWithEMail() {
        const credential = this.myUserGroup.value;
        this.authService.loginWithEMail(credential)
            .then((res) => {
                this.router.navigate(['home']);
            });
    }

    public loginGoogle() {
        this.authService.loginGoogle()
            .then((res) => {
                this.router.navigate(['home']);
            });
    }
    public loginFacebook() {
        this.authService.loginFacebook()
            .then((res) => {
                this.router.navigate(['home']);
            });
    }

    public openDialog(): void {
        const credential = this.myUserGroup.value;
        const dialogRef = this.dialog.open(RecoverPasswordComponent, {
            width: '20rem',
            data: { email: credential.email }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.afAuth.auth.sendPasswordResetEmail(result);
            }
        });
    }


}
