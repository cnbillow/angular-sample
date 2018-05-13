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

  public usersToRemove: any = {};
  public allSelected: boolean;

  constructor() { /* */}

  public selectAllUsers(input) {
    this.users.forEach((user) => {
      this.selectUser(input, user._id);
      this.allSelected = input.target.checked;
    });
  }

  public selectUser(input, _id) {
    input.target.checked ? this.usersToRemove[_id] = _id : delete this.usersToRemove[_id];
  }

  public removeUsers() {
    this.userToRemove.emit({...this.usersToRemove});
  }
}
