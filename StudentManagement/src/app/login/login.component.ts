import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // to dislpay form type whether login or singUp
  formType = 'Login';

  // to display login content
  formContent = 'Please use Registered UserID and Password';

  // to display signup form input fields
  isSignUp: boolean = false;
  
  //  to get entered userId and also to make input filed empty while form newly opend
  @ViewChild('userId') userId: ElementRef;

  //  to get entered password and also to make input filed empty while form newly opend
  @ViewChild('password') password: any;


  constructor(private loginService: LoginService, private apiService: APIService, private messageService: MessageService) { }
  
  // checking the user details while login
  login(userId: string, password: string) {
    this.loginService.login(userId, password);
  }

  //  to create a new user
  signUp(userId: string, password: string) {
    // to avoid user to registering as admin
    if (userId.toLocaleLowerCase() == 'admin') {
      this.messageService.add({ severity: 'error', detail: 'User Admin is already exist' });
    } else {
      // to add new user
      this.apiService.addNewUser(userId, password).subscribe((results) => {
        this.messageService.add({ severity: 'success', detail: 'User ' + userId + ' is registered' });
        this.isSignUp = false;
        this.userId.nativeElement.value = '';
        this.password.input.nativeElement.value = '';

      }, (error) => {
        this.messageService.add({ severity: 'error', detail: 'User ' + userId + ' is already exist' });
      })
    }
  }

  // to show the signUp from
  signUpOption() {
    this.formType = 'SignUp';
    this.formContent = "Please Register using UserID and Password";
    this.isSignUp = true;
    this.userId.nativeElement.value = '';
    this.password.input.nativeElement.value = '';
  }
  // to show the login form
  loginOption() {
    this.formType = 'Login';
    this.formContent = "Please use Registered UserID and Password";
    this.isSignUp = false;
    this.userId.nativeElement.value = '';
    this.password.input.nativeElement.value = '';
  }
}
