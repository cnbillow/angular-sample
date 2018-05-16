import { Component, Input } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  @Input() public email: string;
  constructor(public afAuth: AngularFireAuth) { /**/}

  public recoverPassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.email);
  }
}
