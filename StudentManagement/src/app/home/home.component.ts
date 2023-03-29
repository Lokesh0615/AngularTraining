import { Component,OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sampleText=''
  constructor(private loginService:LoginService){}
  ngOnInit(): void {
    this.sampleText=this.loginService.sampleInput;
    // this.loginService.autoLogin()   
  }
  logOut(){
    this.loginService.logOut()
    
  }
}
