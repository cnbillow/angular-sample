import { Component, Inject } from '@angular/core';
import { User } from '../../models/user.model';

import * as userActions from '../../store/actions';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: 'user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent {
  public users$: Observable<any>;
  public user: User = new User();
  public validUser: boolean;

  constructor(
    private store: Store<fromStore.UserManagementState>,
    private activateRoute: ActivatedRoute,
    private router: Router) {
    this.users$ = this.store.select<any>(fromStore.getAllUsers);

    this.activateRoute.params.subscribe((params) => {
      if (params.id) {
        this.users$.subscribe((users: User[]) => {
          this.user = {
            ...users.find((user: User) => {
              return user._id === params.id;
            })
          };
          if (this.user) {
            this.validUser = true;
          }
        });
      }
    });
  }

  public save() {
    if (this.validUser) {
      this.store.dispatch(new userActions.UpdateUser({ ...this.user }));
    } else {
      this.store.dispatch(new userActions.SaveUser({ ...this.user }));
    }
    this.router.navigateByUrl('/');
  }

}
