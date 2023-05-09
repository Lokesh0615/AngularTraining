import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // to set the dashboard title
  title: string;

  // toset the dashboard icon
  icon: string;

  // to check the loggedIn user admin or not 
  loggedInUser: string;

  // to set the user name icon
  userIcon: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loggedInUser = this.loginService.loggedInUser;
    this.userIcon = this.loggedInUser.substring(0, 1).toUpperCase();
    let icons = JSON.parse(localStorage.getItem('icons'));
    this.title = icons.title;
    this.icon = icons.icon;
    
  }

  logOut() {
    this.loginService.logOut();
    localStorage.clear();
  }
}
