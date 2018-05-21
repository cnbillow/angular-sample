import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/current-user';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    public currentUser: CurrentUser;

    constructor(private router: Router,
        private authService: AuthService) {
    }

    public getUserInfo(): CurrentUser {
        const currentUser = localStorage.getItem('currentUser');
        return JSON.parse(currentUser);
    }

    public logOut(): void {
        this.authService.logout()
        .then((res) => {
            this.router.navigate(['login']);
        });

    }
}
