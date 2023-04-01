import { Component, OnDestroy, ViewChild, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  formIsValid!:boolean|null;
  studentId!:number;
  @ViewChild('studentDetailsForm') studentDetailsForm!:NgForm;
  constructor(private APIService:APIService, private router:Router, private VariableService:VariableService){}
  
  
  ngOnInit(): void {
    this.studentId=this.VariableService.studentId;
  }
  

  onSubmit(studentDetailsForm:NgForm){
    if(!studentDetailsForm.valid){
      alert("Required feilds are missing")
      console.log(studentDetailsForm);
    }else{
      this.APIService.addStudent(studentDetailsForm.value)
      console.log(studentDetailsForm);
      this.router.navigateByUrl('/Student');
    }
    
  }
  getFormStatus(){
    this.formIsValid=this.studentDetailsForm.valid;
  }
  ngOnDestroy(): void {
    
  }
}
