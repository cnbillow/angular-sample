import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() public user: User = new User();
  @Output() public userRemoved: EventEmitter<any> = new  EventEmitter<any>();
  constructor(public dialog: MatDialog, private userService: UsersService) { }

  public editUser(user: User) {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '450px',
      data: {
        user: { ...user }
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.user = result;
    });
  }

  public removeUser() {
    this.userService.remove({_id: this.user._id}).subscribe(() => {
      this.userRemoved.emit(this.user);
    });
  }
}
