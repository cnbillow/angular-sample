import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AngularFireAuth]
})
export class LoginComponent {
    public credential: any = {};
    constructor(public afAuth: AngularFireAuth, private router: Router) { /**/ }

    public loginWithEMail() {
        const credential = firebase.default.auth.EmailAuthProvider.
            credential(this.credential.email, this.credential.password);
        this.afAuth.auth.signInWithEmailAndPassword(this.credential.email, this.credential.password)
            .then(() => {
                console.log('email logged');
            });
    }

    public loginGoogle() {
        this.afAuth.auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
        .then(() => {
            console.log('logged goo');
        });
    }
    public loginFacebook() {
        this.afAuth.auth.signInWithPopup(new firebase.default.auth.FacebookAuthProvider())
        .then(() => {
            console.log('logged face');
        });
    }
}
