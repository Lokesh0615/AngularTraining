import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { ConfirmExitService } from 'src/app/services/confirmExit.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-attendance-details-edit',
  templateUrl: './attendance-details-edit.component.html',
  styleUrls: ['./attendance-details-edit.component.css']
})
export class AttendanceDetailsEditComponent implements OnInit, OnDestroy {
  showAttendanceDetailes = true;
  // attendanceDetailesEdit = false;
  StudentId!: any;
  attendanceData: any={};
  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
              private APIService: APIService, private ConfirmExitService:ConfirmExitService,
              private LoginService:LoginService, private MessageService:MessageService) { }

  @ViewChild('attendanceDetailsForm') attendanceDetailsForm!: NgForm;
  ngOnInit() {
    //if the parameter value changes then use Obeservables
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.StudentId = parm.get('id')?.substring(1);
      this.APIService.findAttendanceByStudentId(this.StudentId).subscribe((results) => {
      console.log(results);
      this.attendanceData = results;
    })
    })
    
  }

  editStudentDetailes() {
    this.showAttendanceDetailes = false;
    // this.attendanceDetailesEdit = true;
    console.log("ad");
    
    
    
    this.attendanceDetailsForm.form.patchValue({
      studentId:this.attendanceData.studentId,
      departmentId:this.attendanceData.departmentId,
      month:this.attendanceData.month,
      date:this.attendanceData.date,
      available:this.attendanceData.available,
      checkIn:this.attendanceData.checkIn,
      checkout:this.attendanceData.checkout,
      attendanceCount:this.attendanceData.attendanceCount,
      // department:this.attendanceData.department,
      // mailId:this.attendanceData.mailId,
      // firstName:this.attendanceData.firstName,
      // lastName:this.attendanceData.lastName,
      // dateOfJoining:this.attendanceData.dateOfJoining,
      createdSource:this.attendanceData.createdSource,
      createdSourceType:this.attendanceData.createdSourceType,
      createdDttm:this.attendanceData.createdDttm,
      modifiedSource:this.attendanceData.modifiedSource,
      modifiedSourceType:this.attendanceData.modifiedSourceType,
      modifiedDttm:this.attendanceData.modifiedDttm
    })
    console.log(new Date(this.attendanceData.dob));
  }

  ngOnDestroy(): void {
      this.router.navigateByUrl('/Attendance')
      this.LoginService.setChildComponentRefresh(false)
  }
  canExit(){
    if(this.attendanceDetailsForm.dirty && this.attendanceDetailsForm.touched){
      if(this.ConfirmExitService.canExit()){
        // this.router.navigateByUrl('/Attendance')
        // this.LoginService.setChildComponentRefresh(false)
        this.ngOnDestroy()
      }
    }else{
      // this.router.navigateByUrl('/Attendance')
      this.ngOnDestroy()
    }
  }

  onSubmint(){
    console.log("submint");
    
    this.MessageService.add({severity:'success', summary:'success Message', detail:'Student'+this.StudentId+' detailes added successfully'});

    this.attendanceDetailsForm.form.patchValue({
      // modifiedSource:this.LoginService.logged_in_user,
      // modifiedSourceType:this.LoginService.logged_in_user,
      modifiedDttm:new Date().toISOString()
    })
    this.APIService.updateAttendance(this.attendanceDetailsForm.value).subscribe((results)=>{}, (error)=>{
      console.log(error);
  });
  console.log(this.attendanceDetailsForm.value);
  
    // this.router.navigateByUrl('/Attendance');
    this.ngOnDestroy()
  }
 
}

