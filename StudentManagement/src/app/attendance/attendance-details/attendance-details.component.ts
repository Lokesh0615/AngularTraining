import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit, OnDestroy {

  // for available dropdown
  availability = [{ type: 'true', name: 'True' }, { type: 'false', name: 'False' }]
  // to show error msg for not enter field
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

  // to check form is invalid or not
  @ViewChild('attendanceDetailsForm') attendanceDetailsForm!: NgForm;

  constructor(private apiService: APIService, private router: Router, private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.attendanceDetails.studentId = parm.get('id')?.substring(1);
      this.attendanceDetails.departmentId = parm.get('did')?.substring(1);
      localStorage.setItem('path', 'Attendance/AddAttendanceDetails/:' + this.attendanceDetails.studentId + '/:' + this.attendanceDetails.departmentId + '')
    })
  }

  ngOnDestroy(): void {
    this.loginService.setChildComponentRefresh(false)
  }

  //  to exit from the editting page 
  canExit() {
    if (this.attendanceDetailsForm.dirty && this.attendanceDetailsForm.touched) {
      this.confirmationService.confirm({
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

  // to submiting the form details
  onSubmit() {
    this.attendanceDetails.createdDttm = new Date();
    this.attendanceDetails.createdSource = "admin";
    this.attendanceDetails.createdSourceType = "admin";
    this.apiService.addAttendanceDetails(this.attendanceDetails).subscribe((results) => { }, (error) => {
      this.router.navigateByUrl('/Attendance')
      this.ngOnDestroy()
    })
  }
}
