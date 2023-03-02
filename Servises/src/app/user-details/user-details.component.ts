import { Component, OnInit } from '@angular/core';
import { UserService1 } from '../Servicees/userService1.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  constructor(private userService1:UserService1){}
  user1!:{name:string, job:string, gender:string, country:string , age:number, avatr:string};

  ngOnInit(){
    this.userService1.onShowDetailesClicked.subscribe((data:{name:string, job:string, gender:string, country:string , age:number, avatr:string})=>{
      this.user1=data;
    });
  }
}
