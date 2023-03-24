import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class CourseGuardService implements CanActivate, CanActivateChild{
    constructor(private authService:AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        if(this.authService.IsAthenticated()){
            return true;
        }else{
            this.router.navigate(['']);
            return false;
        }
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        // console.log(childRoute);
        // console.log(state);
        
        
       return (this.canActivate(childRoute, state))
    }
}