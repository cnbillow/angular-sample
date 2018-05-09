import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { TransferState, makeStateKey } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';

import { Store } from '@ngrx/store';

import { User } from '../models/user.model';
import { UserAddEditComponent } from '../components';

import * as userActions from '../store/actions';
import * as fromStore from '../store';

const USERS_KEY = makeStateKey('users');
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild('userModal') public userModal;
  public users$: Observable<any>;
  public userToEdit: User;
  public searchTerm = new Subject<string>();
  constructor(
    private store: Store<fromStore.UserManagementState>,
    private transferState: TransferState,
  ) {
    this.users$ = this.store.select<any>(fromStore.getAllUsers);
  }

  public ngOnInit() {
    this.loadUsers();
    this.search(this.searchTerm).subscribe();
  }

  public search(terms) {
    return terms
      .debounceTime(400)
      .distinctUntilChanged()
      .do((term) => {
        this.store.dispatch(
          new userActions.LoadUsers({ params: { search: term || '' } })
        );
      });
  }

  public loadUsers() {
    this.store.dispatch(new userActions.LoadUsers());
  }

  public saveUser(user: User) {
    this.store.dispatch(new userActions.SaveUser(user));
  }

  public editUser(user: User) {
    this.store.dispatch(new userActions.UpdateUser(user));
  }

  public removeUser(_id: string) {
    this.store.dispatch(new userActions.DeleteUser(_id));
  }
}
