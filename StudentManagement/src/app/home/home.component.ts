import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private LoginService: LoginService, private VariableService: VariableService) { }

  ngOnInit(): void {
    let storage = localStorage;
    storage.setItem('icons', JSON.stringify({ 'title': 'Home', 'icon': 'pi pi-home' }))
    // this.VariableService.title = 'Home'
    storage.setItem('path', 'Home')

  }
  logOut() {
    this.LoginService.logOut()

  }
}
