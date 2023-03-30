import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent  {

  constructor(){}

  onSubmit(studentDetailsForm:NgForm){
    if(!studentDetailsForm.valid){
      alert("Required feilds are missing")
      console.log(studentDetailsForm);
    }else{
      console.log(studentDetailsForm);
    }
    
  }
  ngOnDestroy(): void {
    
  }
}
