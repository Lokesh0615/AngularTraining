import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StudentManagement';
  logged_in!:boolean;
  constructor(private loginService:LoginService){}
  ngOnInit(){
    this.logged_in=this.loginService.logged_in;
    // console.log(this.logged_in);
    this.loginService.autoLogin()
  }
}
