import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
  ) {}

  public loginWithEMail(user) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(
      user.email,
      user.password);
  }

  public loginGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  public loginFacebook() {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  public isLoggedIn() {
    return this.firebaseAuth.authState;
  }
  public logout() {
    return this.firebaseAuth.auth.signOut();
  }
}
