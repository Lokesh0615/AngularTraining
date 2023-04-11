import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';


@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit, OnDestroy {

  availability = [{ type: 'true', name:'True' }, { type: 'false', name:'False' }]

  attendanceDetails = {
    studentId: null,
    date:null,
    departmentId: null,
    available:'',
    checkIn:null,
    checkout:null,
    attendanceCount:null,
    createdSource: "admin",
    createdSourceType: 'admin',
    createdDttm: null,
    modifiedSource: '',
    modifiedSourceType: '',
    modifiedDttm: null
  }

  @ViewChild('attendanceDetailsForm') attendanceDetailsForm!:NgForm;


  constructor(private APIService: APIService, private router: Router, private activatedRoute: ActivatedRoute,
    private VariableService: VariableService,private ConfirmationService: ConfirmationService,
    private MessageService: MessageService, private LoginService: LoginService) { }

  
    ngOnInit(): void {
   this.attendanceDetails.studentId=this.VariableService.attendanceStudentId;
   this.attendanceDetails.departmentId=this.VariableService.attendenceDepartmentId;
   localStorage.setItem('path','Attendance/AddAttendanceDetails/:'+this.attendanceDetails.studentId+'')
   this.activatedRoute.paramMap.subscribe((parm) => {
    console.log(parm);
    
     this.attendanceDetails.studentId = parm.get('id')?.substring(1);
     this.attendanceDetails.departmentId = parm.get('did')?.substring(1);

 })

  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    // this.router.navigateByUrl('/Attendance')
    this.LoginService.setChildComponentRefresh(false)
  }

  canExit() {
   
    if (this.attendanceDetailsForm.dirty && this.attendanceDetailsForm.touched) {
      // if (this.ConfirmExitService.canExit()) {
      // this.router.navigateByUrl('/Student')
      this.ConfirmationService.confirm({
        message: 'Do you want to exit',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/Attendance')
          this.ngOnDestroy()
        },
        reject: () => {}
      });
      
    }
    else {
      // this.router.navigateByUrl('/Student')
      this.router.navigateByUrl('/Attendance')
      this.ngOnDestroy()
    }
  }


  
  onSubmit(){
    // if(!studentAttendanceForm.valid){
    //   alert("Required feilds are missing")
      // console.log(studentDetailsForm);
      // studentDetailsForm.value.department.value=this.departmentValue;
      // console.log(studentDetailsForm.value.department.value);
      // console.log(this.VariableService.formatedStudentData(studentDetailsForm.value));
      
    // }else{
      this.attendanceDetails.createdDttm=new Date();
      this.attendanceDetails.createdSource="admin";
      this.attendanceDetails.createdSourceType="admin";
      // studentAttendanceForm.value.
      // this.studentAttendanceForm.value.department.value=this.departmentValue;
      // console.log(studentDetailsForm.value.department.value);
      
      this.APIService.addAttendanceDetails(this.attendanceDetails).subscribe((results)=>{
        console.log(results);
        // this.MessageService.add({severity:'success', summary:'success Message', detail:'Student'+this.studentId+' detailes added successfully'});

      }, (error)=>{
        console.log(error);
        this.MessageService.add({severity:'success', summary:'success Message', detail:'Student'+this.attendanceDetails.studentId+' detailes added successfully'});
        this.router.navigateByUrl('/Attendance')
        this.ngOnDestroy()
        
      })

      console.log(this.attendanceDetails);
      // this.router.navigateByUrl('/Attendance');
     
    }
    
  // }


}
