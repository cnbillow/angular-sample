import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { TransferState, makeStateKey } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import { User } from './models/user.model';

import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { UsersService } from './users.service';

const USERS_KEY = makeStateKey('users');
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})

export class UsersComponent implements OnInit {
  public users: any;
  public selectedUser: User;
  public userSubject = new Subject<any>();

  public searchTerm = new Subject<string>();
  constructor(
    public userService: UsersService,
    private state: TransferState,
    public dialog: MatDialog,
  ) {
    this.search(this.searchTerm).subscribe((resp: User[]) => {
      this.userSubject.next(resp);
    });

    this.userSubject.subscribe((users) => {
      this.users = users;
    });
  }

  public ngOnInit() {
    this.userService.get().subscribe((res: User[]) => {
      console.log(res)

      this.userSubject.next(res);
      this.state.set(USERS_KEY, res as any);
    });
   /*  const found = this.state.hasKey(USERS_KEY);
    console.log(found)
    if (found) {
      const users = this.state.get(USERS_KEY, null);
      console.log(users)
     // this.userSubject.next(users);
    } else {
      this.userService.get().subscribe((res: User[]) => {
        console.log(res)

        this.userSubject.next(res);
        this.state.set(USERS_KEY, res as any);
      });
    } */
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

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.userService.save(data).subscribe((user) => {
          this.users.push(user);
          this.userSubject.next(this.users);
        });
      }
    });
  }

  public removeUser(user: User) {
    const indexList = this.getIndexFromUsers(user);

    this.userService.remove({_id: user._id}).subscribe(() => {
      if (indexList > -1) {
        this.users.splice(indexList, 1);
        this.userSubject.next(this.users);
      }
    })

  }

  public editUser(user: User) {
    const indexList = this.getIndexFromUsers(user);

    this.userService.update(user).subscribe(() => {
      if (indexList > -1) {
        this.users[indexList] = user;
        this.userSubject.next(this.users);
      }
    })
   
  }

  public getIndexFromUsers(user) {
    return this.users.findIndex((u) => {
      return u._id === user._id;
    });
  }

  public userSelected(user: User) {
    this.selectedUser = user;
  }

}
