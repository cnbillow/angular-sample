import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  @Input() users: User[];
  @Output() userSelected = new EventEmitter<any> ();

  public loadUser(user) {
    this.userSelected.emit(user);
  }
}
