import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService) { }

    public canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        const path = route.url[0].path;

        return this.authService.isLoggedIn().pipe(map(auth => {
            switch (path) {
                case 'login':
                    if (auth) {
                        this.router.navigate(['/home']);
                        return false;
                    }
                break;
                default:
                    if (!auth) {
                        this.router.navigate(['/login']);
                        return false;
                    }
            }
            return true;
        }));
    }

}
