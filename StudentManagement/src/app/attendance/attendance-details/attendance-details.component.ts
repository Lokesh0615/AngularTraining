import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { ConfirmExitService } from 'src/app/services/confirmExit.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';


@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit {

  studentId!: string;
  departmentId!: string;
  
  @ViewChild('studentAttendanceForm') studentAttendanceForm!:NgForm;
  @ViewChild('checkIn') checkIn!:NgForm;
  @ViewChild('checkIn') checkIn1!:ElementRef;

  constructor(private APIService: APIService, private router: Router,
    private VariableService: VariableService, private ConfirmExitService: ConfirmExitService,
    private MessageService: MessageService, private LoginService: LoginService) { }
  
    ngOnInit(): void {
   this.studentId=this.VariableService.attendanceStudentId;
   this.departmentId=this.VariableService.attendenceDepartmentId;
  }

  canExit(){
    if(this.studentAttendanceForm.dirty && this.studentAttendanceForm.touched){
      if(this.ConfirmExitService.canExit()){
        this.router.navigateByUrl('/Attendance')
      }
    }else{
      this.router.navigateByUrl('/Attendance')
    }
  }


  
  onSubmit(studentAttendanceForm:NgForm){
    console.log(this.checkIn);
    console.log(this.checkIn1);
    // console.log(studentDetailsForm.controls?.['department']);
    // console.log(studentDetailsForm.value);
    
    // console.log (this.VariableService.formatedStudentData(studentDetailsForm.value));
   
    if(!studentAttendanceForm.valid){
      alert("Required feilds are missing")
      // console.log(studentDetailsForm);
      // studentDetailsForm.value.department.value=this.departmentValue;
      // console.log(studentDetailsForm.value.department.value);
      // console.log(this.VariableService.formatedStudentData(studentDetailsForm.value));
      
    }else{
      this.studentAttendanceForm.form.patchValue({

      })
      studentAttendanceForm.value.createdDttm=new Date().toISOString();
      studentAttendanceForm.value.createdSource="admin";
      studentAttendanceForm.value.createdSourceType="admin";
      // studentAttendanceForm.value.
      // this.studentAttendanceForm.value.department.value=this.departmentValue;
      // console.log(studentDetailsForm.value.department.value);
      
      this.APIService.addAttendanceDetails(studentAttendanceForm.value).subscribe((results)=>{
        console.log(results);
      }, (error)=>{
        console.log(error);
        
      })
      console.log(studentAttendanceForm);
      this.router.navigateByUrl('/Attendance');
      this.MessageService.add({severity:'success', summary:'success Message', detail:'Student'+this.studentId+' detailes added successfully'});
    }
    
  }


}
