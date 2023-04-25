import { Injectable } from '@angular/core'
import { Router, CanActivate, } from '@angular/router';
import { APIService } from './APIservice.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class LoginService implements CanActivate {
  // storing user data 
  userData!: any;
  // loggedIn or not
  loggedIn!: boolean;
  // loggedIn user name
  loggedInUser!: string;
  // user Password
  userPassword!: string;
  // localStorage variable
  storage = localStorage;

  constructor(private route: Router, private apiService: APIService, private messageService: MessageService) { }

  //  to activate the login page
  canActivate(): boolean {
    if (!this.storage.getItem('loggedIn')) {
      return true
    } else {
      this.autoLogin()
      let path = localStorage.getItem('path');
      this.route.navigateByUrl(path);
      return false
    }
  }

  // to check user while login
  login(userName: string, password: string) {
    // if loggedIn user is admin, checking in js file only, in backend admin not working
    if (userName == 'admin' && password == 'admin') {
      this.loggedIn = true;
      this.loggedInUser = 'admin'
      let admin = { userId: 'admin', password: 'admin', loggedIn: this.loggedIn, "childComponentOpend": false }
      this.storage.setItem('admin', JSON.stringify(admin))
      this.storage.setItem('path', 'Home')
      this.storage.setItem('loggedIn', 'true')
      this.route.navigateByUrl('Home')
    } else {
      // if not admin 
      let checkUser;
      // cheking in dataBase whther user exits or not
      this.apiService.checkUserExists(userName, password).subscribe((resluts) => {
        checkUser = resluts
        if (checkUser) {
          this.loggedInUser = userName;

          this.loggedIn = true;
          let admin = { userId: userName, password: password, loggedIn: this.loggedIn, "childComponentOpend": false }
          this.storage.setItem('loggedIn', 'true')
          this.storage.setItem('admin', JSON.stringify(admin))
          this.storage.setItem('path', 'Home')
          // here i reassigned loggedInUse so, that user icon name is not working
          // this.loggedInUser=this.userData.userId;
          this.route.navigateByUrl('Home')
        }
      }, (error) => {
        // if not exist showing error message
        this.messageService.add({ severity: 'error', detail: 'Incorrect UserID or Password' });
      })
    }
  }
  // if local storage is empty then naviagte to login page 
  autoLogin() {
    if (!localStorage) {
      return;
    } else {
      // return JSON.parse(localStorage.getItem('admin'))
      // to avoid error we provide {}, 
      this.userData = JSON.parse(this.storage.getItem('admin') || '{}')
      this.userPassword = this.userData.password;
      this.loggedIn = true;
      this.loggedInUser = this.userData.userId;
    }
  }
  // setting childcomponent is opent or not
  setChildComponentRefresh(value: boolean) {
    let admin = { userId: this.loggedInUser, password: this.userPassword, loggedIn: true, childComponentOpend: value }
    this.storage.setItem('admin', JSON.stringify(admin));
  }

  // logout and clearing local storage and navigating to login page
  logOut() {
    this.loggedIn = false;
    this.storage.setItem('loggedIn', 'true')
    this.storage.clear();
    this.route.navigateByUrl('')

  }
}