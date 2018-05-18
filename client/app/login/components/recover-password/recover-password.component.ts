import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  public email: string;
  constructor(
    public dialogRef: MatDialogRef<RecoverPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.email = this.data.email;
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    sendRecoverEmail() {
      this.dialogRef.close(this.email);
    }
}
