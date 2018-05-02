import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-add-edit-user',
    templateUrl: 'add-edit-user.component.html',
    styleUrls: ['./add-edit-user.component.scss']
  })
  export class AddEditUserComponent {

    public user: User;

    constructor(
      public dialogRef: MatDialogRef<AddEditUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.user = data.user;
        if (this.user.isNewUser) {
          this.user.url = 'svg-1'
        }
       }

    public onNoClick(): void {
      this.dialogRef.close({name: 'test'});
    }

    public save() {
      this.dialogRef.close(this.user);
    }

}
