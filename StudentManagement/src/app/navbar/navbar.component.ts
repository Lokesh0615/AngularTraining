import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string;
  icon: string;
  loggedInUser!: string;
  userIcon!: string
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    this.loggedInUser = this.loginService.loggedInUser;
    this.userIcon = this.loggedInUser.substring(0, 1).toUpperCase();
    let icons = JSON.parse(localStorage.getItem('icons'));
    this.title = icons.title;
    this.icon = icons.icon;

  }

  logOut() {
    this.loginService.logOut()
    localStorage.clear()

  }
}
