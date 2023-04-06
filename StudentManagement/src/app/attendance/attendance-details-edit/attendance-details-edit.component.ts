import { Component, OnDestroy, ViewChild, OnInit, ElementRef } from '@angular/core';
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


  checkoutTime!:any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
              private APIService: APIService, private ConfirmExitService:ConfirmExitService,
              private LoginService:LoginService, private MessageService:MessageService) { }

  @ViewChild('attendanceDetailsForm') attendanceDetailsForm!: NgForm;
  @ViewChild('checkIn') checkIn!:NgForm;
  @ViewChild('checkOut') checkOut!:ElementRef;
  ngOnInit() {
    console.log("child");
   
    
    
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
    // console.log(this.attendanceData.checkIn.getTime());
    // console.log(this.bindDate);
    
    // this.attendanceDetailesEdit = true;
    console.log("ad");
    
    console.log(this.checkIn);
    // console.log(this.checkOut);
    // let chekIn=new Date(this.attendanceData.chekIn).getTime()
    // console.log(chekIn);
    // this.checkIn.updateModel=this.attendanceData.checkIn,
    console.log(this.checkIn);
    this.checkOut=this.attendanceData.checkOut
    // console.log(this.checkIn.updateModel);
    
    
    this.attendanceDetailsForm.form.patchValue({
      studentId:this.attendanceData.studentId,
      departmentId:this.attendanceData.departmentId,
      date:new Date(this.attendanceData.date),
      available:this.attendanceData.available,
      checkIn:new Date(this.attendanceData.checkIn),
      checkout:new Date(this.attendanceData.checkout),
      attendanceCount:this.attendanceData.attendanceCount,
      createdSource:this.attendanceData.createdSource,
      createdSourceType:this.attendanceData.createdSourceType,
      createdDttm:this.attendanceData.createdDttm,
      modifiedSource:this.attendanceData.modifiedSource,
      modifiedSourceType:this.attendanceData.modifiedSourceType,
      modifiedDttm:this.attendanceData.modifiedDttm
    })
    // console.log(new Date(this.attendanceData.dob));
    // console.log((new Date(this.attendanceData.checkout).getTime()));
    // console.log(this.attendanceData.checkout.getTime());
    console.log(this.attendanceDetailsForm);

    
    
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

  onSubmit(){
    console.log("submit");
    
    this.MessageService.add({severity:'success', summary:'success Message', detail:'Student'+this.StudentId+' detailes added successfully'});
    // console.log(this.LoginService.logged_in_user),
    this.attendanceDetailsForm.form.patchValue({
      
      
      modifiedSource:"admin",
      modifiedSourceType:"admin",
      modifiedDttm:new Date().toISOString()
    })
    console.log(this.attendanceDetailsForm.value.modifiedDttm);
    
    this.APIService.updateAttendance(this.attendanceDetailsForm.value).subscribe((results)=>{}, (error)=>{
      console.log(error);
  });
  console.log(this.attendanceDetailsForm.value);
  
    // this.router.navigateByUrl('/Attendance');
    this.ngOnDestroy()
  }
 
}

