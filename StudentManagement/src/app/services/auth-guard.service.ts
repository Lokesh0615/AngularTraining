import { Injectable } from '@angular/core'
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private loginService:LoginService, private router: Router){}
    canActivate(){
        if( localStorage.getItem('loggedIn')){
            return true
        }else{
            this.router.navigateByUrl('');

            return false
        }
        // return true;
    }
}