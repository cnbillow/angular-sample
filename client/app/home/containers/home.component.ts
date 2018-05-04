import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    constructor(private router: Router) {
        this.redirectToUsers();
    }

    public redirectToUsers() {
        this.router.navigate(['users']);

    }

    public redirectToRoles() {
        this.router.navigate(['roles']);

    }
}
