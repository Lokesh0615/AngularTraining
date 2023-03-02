import { Component, OnInit } from '@angular/core';
import { UserService1 } from '../Servicees/userService1.service';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{
  constructor(private userService1:UserService1){}

  users1:{name:string, job:string, gender:string, country:string , age:number, avatr:string}[]=[]
  
  ngOnInit(): void {
    this.users1=this.userService1.users;
  }

  ShowDetailes(user:{name:string, job:string, gender:string, country:string , age:number, avatr:string}){
    this.userService1.ShowUserDetailes(user);
  }
}
