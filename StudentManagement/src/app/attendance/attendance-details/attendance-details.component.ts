import { Component, OnInit, ViewChild } from '@angular/core';
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


}
