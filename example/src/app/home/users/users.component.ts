import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  details:{user_name:string, first_name:string, 
            last_name:string, created_date:Date, 
            status:string}[] =[];
  
}
