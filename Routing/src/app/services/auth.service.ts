export class AuthService{
    loggedIn:boolean=false;
    login(){
        this.loggedIn=true;
    }
    logOut(){
        this.loggedIn=false;
    }
    IsAthenticated(){
        return this.loggedIn;
    }
}