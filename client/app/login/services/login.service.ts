import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LogInService {
  constructor(private injector: Injector) {

  }
  public setUserInfo(user) {
    const currentUser =  {
        email: user.email,
        displayName: user.displayName
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.redirectToHome();
}

  public redirectToHome(): void {
    // provitional solution for a bug in router
    // https://stackoverflow.com/questions/48325743/routing-child-to-parent-is-
    // not-working-when-navigates-in-angular
    const routerService = this.injector.get(Router);
    const ngZone = this.injector.get(NgZone);
    ngZone.run(() => {
        routerService.navigate(['/home'], { skipLocationChange: true });
    });
  }

}
