import { Component } from '@angular/core';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { LogInService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public credential: any = {};
    constructor(public afAuth: AngularFireAuth,
                private loginService: LogInService,
                private injector: Injector) { /**/ }

    public loginWithEMail() {
        const credential = firebase.default.auth.EmailAuthProvider.
            credential(this.credential.email, this.credential.password);
        this.afAuth.auth.signInWithEmailAndPassword(this.credential.email, this.credential.password)
            .then((res) => {
                this.setUserInfo(res.user);
        });
    }

    public loginGoogle() {
        this.afAuth.auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
        .then((res) => {
            this.setUserInfo(res.user);
        });
    }
    public loginFacebook() {
        this.afAuth.auth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider())
        .then((res) => {
            this.setUserInfo(res.user);
        });
    }

    public setUserInfo(user) {
        const currentUser =  {
            email: user.email,
            displayName: user.displayName
        };

        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.redirectToHome();
    }

    public redirectToHome(): void {
        // provitional solution for a bug in router
        // https://stackoverflow.com/questions/48325743/routing-child-to-parent-is-
        // not-working-when-navigates-in-angular
        /* const routerService = this.injector.get(Router);
        const ngZone = this.injector.get(NgZone);
        ngZone.run(() => {
            routerService.navigate(['/home'], { skipLocationChange: true });
        }); */

        this.loginService.redirectToHome();
      }
}
