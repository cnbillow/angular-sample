import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { UserAddEditComponent } from '../';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})

export class UserListComponent {
  @Input() public users;
  @Output() public userToRemove = new EventEmitter<any> ();
  @Output() public userToEdit = new EventEmitter<any> ();

  public displayedColumns = [
    'name',
    'role',
    'location',
    'actions'
  ];

  constructor() { /* */}

  public deleteUser(_id: string) {
    this.userToRemove.emit(_id);
  }
}
