import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import{ map, Subject, catchError } from 'rxjs'
import { throwError } from 'rxjs';
import { identifierName } from '@angular/compiler';
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
        // return true;
    }
}