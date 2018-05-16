import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  providers: [AngularFireAuth],
})
export class NewAccountComponent {
  public user;
  constructor(public afAuth: AngularFireAuth) { /**/ }

  public createAccount() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.user.pasword);
  }

}
