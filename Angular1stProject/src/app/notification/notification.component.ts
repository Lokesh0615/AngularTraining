import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  // template:`<div class="alert alert-success"><p>websiteeeee</p></div>`,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  alertSuccess:string="alert alert-success"
  displayNotificatoion:boolean=false;
  closeNotification(){
    this.displayNotificatoion=true;
  }
}
