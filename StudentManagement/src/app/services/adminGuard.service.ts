import { Injectable } from '@angular/core'
import {  Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AdminGuardServie implements CanActivate {
    constructor(private loginService:LoginService, private route:Router){}
    canActivate(){
        if(this.loginService.logged_in_user.toLowerCase() == 'admin'){
            return true
        }else{
            let path=localStorage.getItem('path');
            this.route.navigateByUrl(path);
            return false
        }
    }
}