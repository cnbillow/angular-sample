import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { User } from '../models/user.model';

@Component({
    selector: 'app-add-edit-user',
    templateUrl: 'add-edit-user.component.html',
    styleUrls: ['./add-edit-user.component.scss']
  })
  export class AddEditUserComponent {

    public user: User;

    constructor(
      private userService: UsersService,
      public dialogRef: MatDialogRef<AddEditUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.user = data.user;
       }

    public onNoClick(): void {
      this.dialogRef.close({name: 'test'});
    }

    public save() {
      if (this.user.isNewUser) {
        this.userService.save(this.user).subscribe((res) => {
          this.dialogRef.close(this.user);
        });
      } else {
        this.userService.update(this.user).subscribe((res) => {
          this.dialogRef.close();
        });
      }

    }

}
