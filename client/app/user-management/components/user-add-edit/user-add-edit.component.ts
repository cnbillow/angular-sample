import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-add-edit-user',
    templateUrl: 'user-add-edit.component.html',
    styleUrls: ['./user-add-edit.component.scss']
  })
  export class UserAddEditComponent {

    public user: User;

    constructor(
      public dialogRef: MatDialogRef<UserAddEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.user = data.user;
        if (this.user.isNewUser) {
          this.user.url = 'svg-1';
        }
       }

    public onNoClick(): void {
      this.dialogRef.close({name: 'test'});
    }

    public save() {
      this.dialogRef.close(this.user);
    }

}
