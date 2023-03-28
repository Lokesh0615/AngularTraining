import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import{ map, Subject, catchError } from 'rxjs'
import { throwError } from 'rxjs';
import { identifierName } from '@angular/compiler';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private loginService:LoginService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.loginService.logged_in){
            return true
        }else{
            return false
        }
        // return true;
    }
}