import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from '../';

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

  constructor(public dialog: MatDialog) {}

  public editUser(user: User) {
    const dialogRef = this.dialog.open(UserAddEditComponent, {
      width: '450px',
      data: {
        user: { ...user }
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userToEdit.emit(result);
      }
    });
  }

  public deleteUser(_id: string) {
    this.userToRemove.emit(_id);
  }
}
