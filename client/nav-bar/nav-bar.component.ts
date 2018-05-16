import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
    public currentUser;

    constructor(private router: Router) {
        this.currentUser = this.getUserInfo();
    }

    public getUserInfo() {
        const currentUser = localStorage.getItem('currentUser');
        return JSON.parse(currentUser);
    }

    public logOut() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}
