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

  formType = 'Login';
  formContent = 'Please use Registered UserID and Password'
  isSignUp: boolean = false;
  
  @ViewChild('userId') userId!: ElementRef;
  @ViewChild('password') password!: any;

  constructor(private loginService: LoginService, private apiService: APIService, private messageService: MessageService) { }

  login(userId: string, password: string) {
    this.loginService.login(userId, password)
  }

  signUp(userId: string, password: string) {
    if (userId.toLocaleLowerCase() == 'admin') {
      this.messageService.add({ severity: 'error', detail: 'User Admin is already exist' });
    } else {
      this.apiService.addNewUser(userId, password).subscribe((results) => {
        this.messageService.add({ severity: 'success', detail: 'User ' + userId + ' is registered' });
        this.isSignUp = false;
        this.userId.nativeElement.value = '';
        this.password.input.nativeElement.value = ''

      }, (error) => {
        this.messageService.add({ severity: 'error', detail: 'User ' + userId + ' is already exist' });

      })
    }

  }

  signUpOption() {
    this.formType = 'SignUp';
    this.formContent = "Please Register using UserID and Password"
    this.isSignUp = true;
    this.userId.nativeElement.value = '';
    this.password.input.nativeElement.value = ''
  }
  loginOption() {
    this.formType = 'Login';
    this.formContent = "Please use Registered UserID and Password"
    this.isSignUp = false;
    this.userId.nativeElement.value = '';
    this.password.input.nativeElement.value = ''
  }

}
