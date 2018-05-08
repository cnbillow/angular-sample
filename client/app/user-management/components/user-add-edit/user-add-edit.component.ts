import { Component, Inject } from '@angular/core';
import { User } from '../../models/user.model';

import * as userActions from '../../store/actions';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: 'user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent {
  public users$: Observable<any>;

  public user: User = new User();

  constructor( private store: Store<fromStore.UserManagementState>,) {
    this.users$ = this.store.select<any>(fromStore.getAllUsers);
  }

  public save() {
    this.store.dispatch(new userActions.SaveUser({...this.user}));
  }

}
