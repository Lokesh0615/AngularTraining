import { Component, OnInit } from '@angular/core';
import { EnrollService } from './Servicees/enroll.service';
import { UserService } from './Servicees/UserService.service';
import { LoggerService } from './Servicees/logger.service'
import { UserService1 } from './Servicees/userService1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EnrollService, UserService, LoggerService, UserService1]
})
export class AppComponent implements OnInit {
  constructor(private userService:UserService, private userService1:UserService1){}
  title = 'Servises';

  // we are looping over this users only, which is got from userService.service
  users:{name:string, status:string}[]=[];
  users1:{name:string, job:string, gender:string, country:string , age:number, avatr:string}[]=[]
  ngOnInit(){
    this.users=this.userService.users;
    this.users1=this.userService1.users;
    // console.log(this.users);
    
  }
}
