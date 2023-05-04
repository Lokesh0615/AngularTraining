import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AdminGuardServie implements CanActivate {
    constructor(private loginService: LoginService, private route: Router) { }
    canActivate() {
        if (this.loginService.loggedInUser == 'admin' && localStorage.getItem('loggedIn')) {
            return true
        } else {
            if (!localStorage.getItem('path')) {
                this.route.navigateByUrl('');
                return false;
            } else {
                this.route.navigateByUrl(localStorage.getItem('path'));
                return false;
            }
        }
    }
}