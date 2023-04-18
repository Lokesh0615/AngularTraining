import { DatePipe } from '@angular/common';
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
  fieldSelected=true
  showAttendanceDetailes = true;
  // attendanceDetailesEdit = false;
  StudentId!: any;
  // attendanceData: any = {};

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
        this.attendanceDetails = results;
        this.attendanceDetails.date = new Date(results.date);
        this.attendanceDetails.checkIn = new Date(results.checkIn);
        this.attendanceDetails.checkout = new Date(results.checkout);
        this.attendanceDetails.createdDttm=new Date(results.createdDttm)
        this.attendanceDetails.modifiedDttm=new Date(results.modifiedDttm)
        localStorage.setItem('path', 'Attendance/AttendanceDetails/:' + this.attendanceDetails.studentId + '')
        this.attendanceDetails.available = String(results.available);



      })
    })

  }

  editStudentDetailes() {
    this.showAttendanceDetailes = false;

    this.attendanceDetails.available = this.attendanceDetails.available;

   


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
        this.router.navigateByUrl('/Attendance')
        this.ngOnDestroy()
      }
    }
   
  }

  onSubmit() {
    this.attendanceDetails.modifiedSource = "admin";
    this.attendanceDetails.modifiedSourceType = "admin",
      this.attendanceDetails.modifiedDttm = new Date()
    this.attendanceDetails.available =this.attendanceDetails.available
    // })

    this.APIService.updateAttendance(this.attendanceDetails).subscribe((results) => { }, (error) => {
      
      
      this.MessageService.add({ severity: 'success', detail: 'Student' + this.StudentId + ' detailes added successfully' });
      this.router.navigateByUrl('/Attendance')
      this.ngOnDestroy()

    });
    console.log(this.attendanceDetailsForm.value);

    // this.router.navigateByUrl('/Attendance');
  }

}

