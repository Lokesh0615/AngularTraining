import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (localStorage.getItem('loggedIn')) {
            return true
        } else {
            this.router.navigateByUrl('');
            return false
        }
    }
}