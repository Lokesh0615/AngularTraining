import { Component } from '@angular/core';
import { UserService } from '../Servicees/UserService.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  // providers: [UserService]
})
export class AddUserComponent {
  userName: string = '';
  status: string = "Active"
  constructor(private userService: UserService) { }

  addUser() {
    if (this.userName != "") {
      this.userService.AddNewUser(this.userName, this.status);
      // console.log(this.userService.users);
    }
  }
}
