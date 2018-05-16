import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { CurrentUser } from '../../../models/current-user';
import { LogInService } from '../../services/login.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent {
  public user: CurrentUser = new CurrentUser();
  constructor(
    public afAuth: AngularFireAuth,
    private loginService: LogInService) { /**/ }

  public createAccount() {
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.user.email, this.user.password).then((res) => {
        this.loginService.setUserInfo(res.user);
    });

  }

}
