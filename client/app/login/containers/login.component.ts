import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Router } from '@angular/router';
import { LogInService } from '../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { RecoverPasswordComponent } from '../components/recover-password/recover-password.component';

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
                private formBuilder: FormBuilder,
                private loginService: LogInService) {

                    this.myUserGroup = this.formBuilder.group({
                        email: ['', [Validators.required, Validators.email]],
                        password: ['', [Validators.required, Validators.minLength(8)]],
                    });
                 }

    public loginWithEMail() {
        const credential =  this.myUserGroup.value;
        this.afAuth.auth.signInWithEmailAndPassword(
            credential.email,
            credential.password)
            .then((res) => {
                this.loginService.setUserInfo(res.user);
        });
    }

    public loginGoogle() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res) => {
            this.loginService.setUserInfo(res.user);
        });
    }
    public loginFacebook() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
            this.loginService.setUserInfo(res.user);
        });
    }

    openDialog(): void {
        const credential =  this.myUserGroup.value;
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
