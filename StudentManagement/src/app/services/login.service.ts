import { Injectable } from '@angular/core'
import { Router, CanActivate, } from '@angular/router';
import { APIService } from './APIservice.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class LoginService implements CanActivate {
  userData!: any;
  loggedIn!: boolean;
  loggedInUser!: string;
  userPassword!: string;
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

  sampleInput = ''

  // to check user while login
  login(userName: string, password: string) {
    if (userName == 'admin' && password == 'admin') {
      this.sampleInput = password;
      this.loggedIn = true;
      this.loggedInUser = 'admin'
      let admin = { userId: 'admin', password: 'admin', loggedIn: this.loggedIn, "childComponentOpend": false }
      this.storage.setItem('admin', JSON.stringify(admin))
      this.storage.setItem('path', 'Home')
      this.storage.setItem('loggedIn', 'true')
      this.route.navigateByUrl('Home')
    } else {
      let checkUser;
      this.apiService.checkUserExists(userName, password).subscribe((resluts) => {
        checkUser = resluts
        if (checkUser) {
          this.loggedInUser = userName;

          this.sampleInput = password;
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
        this.messageService.add({ severity: 'error', detail: 'Incorrect UserID or Password' });
      })
    }
  }
  autoLogin() {

    if (!localStorage) {
      return;
    } else {
      // return JSON.parse(localStorage.getItem('admin'))
      // to avoid error we provide {}, 
      this.userData = JSON.parse(this.storage.getItem('admin') || '{}')
      this.sampleInput = this.userData.password;
      this.loggedIn = true;
      this.loggedInUser = this.userData.userId;
    }
  }

  setChildComponentRefresh(value: boolean) {
    let admin = { userId: this.loggedInUser, password: this.userPassword, loggedIn: true, childComponentOpend: value }
    this.storage.setItem('admin', JSON.stringify(admin));
  }

  logOut() {
    this.loggedIn = false;
    this.storage.setItem('loggedIn', 'true')
    this.storage.clear();
    this.route.navigateByUrl('')

  }
}