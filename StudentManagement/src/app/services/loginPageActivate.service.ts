import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "./login.service";

@Injectable()
export class LoginPageActivateService implements CanActivate {

    constructor(private loginService: LoginService, private route: Router) { }

    //  to activate the login page
    canActivate(): boolean {
        if (!localStorage.getItem('loggedIn')) {
            return true;
        } else {
            this.loginService.autoLogin();
            let path = localStorage.getItem('path');
            this.route.navigateByUrl(path);
            return false;
        }
    }

}