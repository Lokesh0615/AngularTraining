import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { ConfirmExitService } from 'src/app/services/confirmExit.service';
import { LoginService } from 'src/app/services/login.service';
import { StudentDetailesService } from 'src/app/services/studentDetailes';

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
              private LoginService:LoginService) { }

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
      dob:this.attendanceData.dob,
      gender:this.attendanceData.gender,
      bloodGroup:this.attendanceData.bloodGroup,
      phoneNumber:this.attendanceData.phoneNumber,
      address:this.attendanceData.address,
      department:this.attendanceData.department,
      departmentId:this.attendanceData.departmentId,
      mailId:this.attendanceData.mailId,
      firstName:this.attendanceData.firstName,
      lastName:this.attendanceData.lastName,
      dateOfJoining:this.attendanceData.dateOfJoining,
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
    this.router.navigate(['Attendance'])
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
    this.APIService.updateStudentDetails(this.attendanceDetailsForm.value).subscribe((results)=>{}, (error)=>{
      // console.log(error);
  });
    // this.router.navigateByUrl('/Attendance');
    this.ngOnDestroy()
  }
}

