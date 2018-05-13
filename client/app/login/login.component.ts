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
    constructor(public afAuth: AngularFireAuth, private router: Router) { /**/ }

    public login() {
        this.afAuth.auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
        .then(() => {
            this.router.navigate(['users']);
        });
    }
}
