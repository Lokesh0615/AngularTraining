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
  
  @ViewChild('user_id') user_id!: ElementRef;
  @ViewChild('password') password!: any;

  constructor(private loginService: LoginService, private APIService: APIService, private MessageService: MessageService) { }

  login(user_id: string, password: string) {
    this.loginService.login(user_id, password)
  }

  signUp(user_id: string, password: string) {
    if (user_id.toLocaleLowerCase() == 'admin') {
      this.MessageService.add({ severity: 'error', detail: 'User Admin is already exist' });
    } else {
      this.APIService.addUser(user_id, password).subscribe((results) => {
        this.MessageService.add({ severity: 'success', detail: 'User ' + user_id + ' is registered' });
        this.isSignUp = false;
        this.user_id.nativeElement.value = '';
        this.password.input.nativeElement.value = ''

      }, (error) => {
        this.MessageService.add({ severity: 'error', detail: 'User ' + user_id + ' is already exist' });

      })
    }

  }

  signUpOption() {
    this.formType = 'SignUp';
    this.formContent = "Please Register using UserID and Password"
    this.isSignUp = true;
    this.user_id.nativeElement.value = '';
    this.password.input.nativeElement.value = ''
  }
  loginOption() {
    this.formType = 'Login';
    this.formContent = "Please use Registered UserID and Password"
    this.isSignUp = false;
    this.user_id.nativeElement.value = '';
    this.password.input.nativeElement.value = ''
  }

}
