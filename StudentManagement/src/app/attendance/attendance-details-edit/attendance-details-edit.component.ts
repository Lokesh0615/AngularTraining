import { Component, OnDestroy, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-attendance-details-edit',
  templateUrl: './attendance-details-edit.component.html',
  styleUrls: ['./attendance-details-edit.component.css']
})
export class AttendanceDetailsEditComponent implements OnInit, OnDestroy {

  loggedInUser!: string;

  showAttendanceDetailes = true;
  // attendanceDetailesEdit = false;
  StudentId!: any;
  attendanceData: any = {};

  availability = [{ type: 'true', name:'True' }, { type: 'false', name:'False' }]


  attendanceDetails = {
    studentId: null,
    date: null,
    departmentId: null,
    available: null,
    checkIn: null,
    checkout: null,
    attendanceCount: null,
    createdSource: "admin",
    createdSourceType: 'admin',
    createdDttm: null,
    modifiedSource: 'admin',
    modifiedSourceType: 'admin',
    modifiedDttm: null,

  }

  checkoutTime!: any;
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private APIService: APIService,private ConfirmationService: ConfirmationService,
    private LoginService: LoginService, private MessageService: MessageService, ) { }

  @ViewChild('attendanceDetailsForm') attendanceDetailsForm!: NgForm;
  ngOnInit() {
    console.log("child");


    this.loggedInUser = this.LoginService.logged_in_user;


    //if the parameter value changes then use Obeservables
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.attendanceDetails.studentId = parm.get('id')?.substring(1);
      this.APIService.findAttendanceByStudentId(this.attendanceDetails.studentId).subscribe((results: any) => {
        console.log(results);
        this.attendanceData = results;
        this.attendanceDetails = results;
        localStorage.setItem('path', 'Attendance/AttendanceDetails/:' + this.attendanceDetails.studentId + '')
        this.attendanceDetails.available = String(results.available);
        console.log(Boolean(results.available));
        console.log(this.attendanceDetails.available);



      })
    })

  }

  editStudentDetailes() {
    this.showAttendanceDetailes = false;
    console.log("ad");

    console.log(this.attendanceDetails.available);
    this.attendanceDetails.available = this.attendanceData.available;
    console.log(this.attendanceDetails.available);

    this.attendanceDetails.date = new Date(this.attendanceData.date);
    this.attendanceDetails.checkIn = new Date(this.attendanceData.checkIn);
    this.attendanceDetails.checkout = new Date(this.attendanceData.checkout);


  }

  ngOnDestroy(): void {
    this.LoginService.setChildComponentRefresh(false)
  }

  canExit() {
    if(this.showAttendanceDetailes){
      this.router.navigateByUrl('/Attendance')
      this.ngOnDestroy()
    }else{
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
   
  }

  onSubmit() {
    console.log("submit");
    this.attendanceDetails.modifiedSource = "admin";
    this.attendanceDetails.modifiedSourceType = "admin",
      this.attendanceDetails.modifiedDttm = new Date()
    this.attendanceDetails.available =this.attendanceDetails.available
    // })
    console.log(this.attendanceDetailsForm.value.modifiedDttm);

    this.APIService.updateAttendance(this.attendanceDetails).subscribe((results) => { }, (error) => {
      console.log(error);
      this.MessageService.add({ severity: 'success', summary: 'success Message', detail: 'Student' + this.StudentId + ' detailes added successfully' });
      this.router.navigateByUrl('/Attendance')
      this.ngOnDestroy()

    });
    console.log(this.attendanceDetailsForm.value);

    // this.router.navigateByUrl('/Attendance');
  }

}

