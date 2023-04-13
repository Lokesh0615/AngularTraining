import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  title:string;
  icon:string;
  loggedInUser!:string;
  userIcon!:string
  constructor(private VariableService:VariableService, private LoginService:LoginService){}

  ngOnInit(): void {
    // localStorage.setItem('path','Home')

    

    this.loggedInUser=this.LoginService.logged_in_user;
    this.userIcon=this.loggedInUser.substring(0,1).toUpperCase()
    // console.log(this.userIcon);
    console.log(this.userIcon);
    
    
    let icons=JSON.parse(localStorage.getItem('icons'));
    this.title=icons.title;
    console.log(this.title);
    
    this.icon=icons.icon;
    console.log(localStorage.length);
    
    console.log("1st navbar");



  }

  changeTitle(title:string, icon:string){
    // this.VariableService.titleChange.subscribe((data)=>{
    //   console.log(data);
      
    //   this.title=String(data)
    // })
    this.title=title
    console.log(title);
    this.icon=icon;
    this.ngOnInit()

    
    
  }
  logOut(){
    this.LoginService.logOut()
    localStorage.clear()

  }
  
  ngOnDestroy(): void {
    // localStorage.clear()
  }

}
