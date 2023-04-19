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

  availability = [{ type: 'true', name: 'True' }, { type: 'false', name: 'False' }]
  fieldSelected = true;

  attendanceDetails = {
    studentId: '',
    date: null,
    departmentId: null,
    available: '',
    checkIn: null,
    checkout: null,
    attendanceCount: null,
    createdSource: "admin",
    createdSourceType: 'admin',
    createdDttm: null,
    modifiedSource: '',
    modifiedSourceType: '',
    modifiedDttm: null
  }

  @ViewChild('attendanceDetailsForm') attendanceDetailsForm!: NgForm;

  constructor(private APIService: APIService, private router: Router, private activatedRoute: ActivatedRoute,
    private ConfirmationService: ConfirmationService, private LoginService: LoginService) { }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((parm) => {
      this.attendanceDetails.studentId = parm.get('id')?.substring(1);
      this.attendanceDetails.departmentId = parm.get('did')?.substring(1);
      localStorage.setItem('path', 'Attendance/AddAttendanceDetails/:' + this.attendanceDetails.studentId + '/:' + this.attendanceDetails.departmentId + '')

    })

  }

  ngOnDestroy(): void {
    this.LoginService.setChildComponentRefresh(false)
  }

  canExit() {

    if (this.attendanceDetailsForm.dirty && this.attendanceDetailsForm.touched) {
      this.ConfirmationService.confirm({
        message: 'Do you want to exit',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/Attendance')
          this.ngOnDestroy()
        },
        reject: () => { }
      });

    }
    else {
      this.router.navigateByUrl('/Attendance')
      this.ngOnDestroy()
    }
  }

  onSubmit() {
    this.attendanceDetails.createdDttm = new Date();
    this.attendanceDetails.createdSource = "admin";
    this.attendanceDetails.createdSourceType = "admin";
    this.APIService.addAttendanceDetails(this.attendanceDetails).subscribe((results) => { }, (error) => {
      this.router.navigateByUrl('/Attendance')
      this.ngOnDestroy()
    })

  }

}
