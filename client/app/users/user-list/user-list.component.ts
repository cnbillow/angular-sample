import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

const USERS_KEY = makeStateKey('users');

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: User[];

  public searchTerm = new Subject<string>();
  constructor(
    private userService: UsersService,
    private state: TransferState,
    public dialog: MatDialog,
  ) {
    this.search(this.searchTerm).subscribe((resp: User[]) => {
      this.users = resp;
    });
  }

  public ngOnInit() {
    const found = this.state.hasKey(USERS_KEY);
    if (found) {
      this.users = this.state.get(USERS_KEY, null);
    } else {
      this.userService.get().subscribe((res: User[]) => {
        this.users = res;
        this.state.set(USERS_KEY, res as any);
      });
    }
  }

  public search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap((term) => {
        return this.userService.get({params : {search: term}});
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.users.push(result);
      }
    });
  }

  public userRemoved(user) {
    const indexList = this.users.findIndex((u) => {
      return u._id === user._id;
    });

    if (indexList > -1) {
      this.users.splice(indexList, 1);
    }
  }
}
