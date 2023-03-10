import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Routing';
  displayLoadingIndicator:boolean=false;
  constructor(private activatedRoute:ActivatedRoute, private authService:AuthService, private router:Router){}
 
  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value)=>{
      // console.log(value);
      
      this.jumpTo(value)
    })
    // navigation events router
    this.router.events.subscribe((routerEvent:Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.displayLoadingIndicator=true;
      }

      if(routerEvent instanceof NavigationEnd|| 
        routerEvent instanceof NavigationCancel||
        routerEvent instanceof NavigationError ){
        this.displayLoadingIndicator=false;
      }
    })
    // document.getElementById("home")?.style.backgroundColor
  }

  jumpTo(section:any){
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'});
    // document.getElementById(section).

    let b=String(section);
    let c=document.getElementById(b);
  }

  // route guard
  login(){
    this.authService.login()
  }
  logOut(){
    this.authService.logOut()
  }

}
