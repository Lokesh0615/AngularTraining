import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forms';
  @ViewChild('myForm') form!:NgForm;
  defaultCountry="India"


  // onSubmit(form:HTMLFormElement){ notmal dom element
  onSubmit(form:NgForm){
    console.log(form);
    
  }
}
