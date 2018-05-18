import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { CurrentUser } from '../../../models/current-user';
import { LogInService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../validators/password-validator';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent {
  public user: CurrentUser = new CurrentUser();
  public newUserGroup: FormGroup;

  constructor(
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private loginService: LogInService) {
    this.newUserGroup = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  public createAccount() {
    const newUser = this.newUserGroup.value;
    this.afAuth.auth.createUserWithEmailAndPassword(
      newUser.email, newUser.password).then((res) => {
        this.loginService.setUserInfo(res.user);
    });

  }

}
