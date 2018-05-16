import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { Router } from '@angular/router';
import { LogInService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public invalidForm: boolean;
    public myUserGroup: FormGroup;

    constructor(public afAuth: AngularFireAuth,
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
}
