import { Component, OnDestroy, ViewChild, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { ConfirmExitService } from 'src/app/services/confirmExit.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  formIsValid!:boolean|null;
  studentId!:number;
  createdSource="admin";
  createdSourceType='admin';
  createdDttm="";
  
  departmentList=this.VariableService.departmentList;
  departmentValue=''
  genderSelected:string|null=null
  // selectedDepartment=''
  @ViewChild('studentDetailsForm') studentDetailsForm!:NgForm;
  constructor(private APIService:APIService, private router:Router, private VariableService:VariableService, private ConfirmExitService:ConfirmExitService, private MessageService:MessageService){}
  
  
  ngOnInit(): void {
    this.studentId=Number(this.VariableService.studentId);
  }
  

  onSubmit(studentDetailsForm:NgForm){
    console.log(studentDetailsForm.value);
    
    if(!studentDetailsForm.valid){
      alert("Required feilds are missing")
      console.log(studentDetailsForm);
    }else{
      this.createdDttm=new Date().toISOString();
      this.APIService.addStudent(studentDetailsForm.value)
      console.log(studentDetailsForm);
      this.router.navigateByUrl('/Student');
      this.MessageService.add({severity:'success', summary:'success Message', detail:'Student'+this.studentId+' detailes added successfully'});
    }
    
  }
  getFormStatus(){
    this.formIsValid=this.studentDetailsForm.valid;
  }
  ngOnDestroy(): void {
    
  }
  canExit(){
    if(this.studentDetailsForm.dirty && this.studentDetailsForm.touched){
      if(this.ConfirmExitService.canExit()){
        this.router.navigateByUrl('/Student')
      }
    }else{
      this.router.navigateByUrl('/Student')
    }
  }
}
