import { Component, Inject } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-add-edit-user',
    templateUrl: 'user-add-edit.component.html',
    styleUrls: ['./user-add-edit.component.scss']
  })
  export class UserAddEditComponent {

    public user: User;

    constructor()
{       }

    public onNoClick(): void {
    }

    public save() {
    }

}
