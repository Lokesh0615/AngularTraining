import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import{ map, Subject, catchError } from 'rxjs'
import { throwError } from 'rxjs';
import { identifierName } from '@angular/compiler';
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