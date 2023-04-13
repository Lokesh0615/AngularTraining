import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sampleText=''
  constructor(private LoginService:LoginService, private VariableService:VariableService, private router: Router){}
  ngOnInit(): void {
    // this.LoginService.setChildComponentRefresh(false)

    localStorage.setItem('icons',JSON.stringify({'title':'Home', 'icon':'pi pi-home'}))
    this.VariableService.title='Home'
    // this.loggedInUser=this.LoginService.logged_in_user;
    localStorage.setItem('path','Home')
    // this.sampleText=this.loginService.sampleInput;
    // this.loginService.autoLogin()   
    console.log("1st home");
    // this.router.navigate([''])


  }
  logOut(){
    this.LoginService.logOut()
    
  }
}
