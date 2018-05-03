import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { TransferState, makeStateKey } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import { User } from '../models/user.model';

import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { UsersService } from './users.service';
import { Store } from '@ngrx/store';
import { AppState } from '../models/app-state';

import * as userActions from '../state/actions/user.actions';

const USERS_KEY = makeStateKey('users');
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})

export class UsersComponent implements OnInit {
  public users$: Observable<any>;

  public searchTerm = new Subject<string>();
  constructor(
    private store: Store<AppState>,
    private transferState: TransferState,
    public dialog: MatDialog,
  ) {
    this.users$ = this.store.select((state) => state.users);
  }

  public ngOnInit() {
    this.loadUsers();
    this.search(this.searchTerm).subscribe();
  }

  public search(terms) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .do((term) => {
          this.store.dispatch(
            new userActions.LoadUsersAction({params : {search: term || ''}}
          ));
      });
  }

  public createUser() {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '450px',
      data: {
        user: {
          isNewUser: true,
        }
      }
    });

    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.saveUser(user);
      }
    });
  }

  public loadUsers() {

    const found = this.transferState.hasKey(USERS_KEY);
    if (found) {
      this.store.dispatch(new userActions.SetUserAction());
    } else {
      this.store.dispatch(new userActions.LoadUsersAction());
    }
  }

  public saveUser(user: User) {
    this.store.dispatch(new userActions.SaveUserAction(user));
  }

  public editUser(user: User) {
    this.store.dispatch(new userActions.UpdateUserAction(user));
  }

  public removeUser(_id: string) {
    this.store.dispatch(new userActions.DeleteUsersAction(_id));
  }

}
