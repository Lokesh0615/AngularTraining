import { Component } from '@angular/core';
import { IDeactivateComponent } from '../services/canDeactivateGuard.service';
import { CanLoadService } from '../services/canLoad.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers:[CanLoadService]
})
export class ContactComponent implements IDeactivateComponent {
  firstName="";
  lastName='';
  country='';
  subject='';

  canExit(){
    // console.log(this.firstName);
    
    if(this.firstName || this.lastName || this.subject|| this.country){
      return confirm('You have unsaved the changes. Do you really want to discard these changes')
    }else{
      return true;
    }
  }

}
