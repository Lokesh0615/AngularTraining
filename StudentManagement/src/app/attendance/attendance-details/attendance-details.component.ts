import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit, OnDestroy {

  // for available dropdown
  availability;

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
    createdSource: '',
    createdSourceType: '',
    createdDttm: null,
    modifiedSource: '',
    modifiedSourceType: '',
    modifiedDttm: ''
  }

  // to check form is invalid or not
  @ViewChild('attendanceDetailsForm') attendanceDetailsForm!: NgForm;

  constructor(private apiService: APIService, private router: Router, private activatedRoute: ActivatedRoute,
    private loginService: LoginService, private variableService: VariableService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.attendanceDetails.studentId = parm.get('id')?.substring(1);
      this.attendanceDetails.departmentId = parm.get('departmentId')?.substring(1);
      localStorage.setItem('path', 'Attendance/AddAttendanceDetails/:' + this.attendanceDetails.studentId + '/:' + this.attendanceDetails.departmentId);
    });
    this.availability = this.variableService.availability;
  }

  ngOnDestroy(): void {
    this.loginService.setChildComponentRefresh(false);
  }

  //  to exit from the editting page 
  canExitFromPage() {
    if (this.attendanceDetailsForm.dirty && this.attendanceDetailsForm.touched) {
      // in variable service canExit method will show confirm dailog
      this.variableService.canExit('Attendance');
    } else {
      this.router.navigateByUrl('/Attendance');
      this.ngOnDestroy();
    }
  }

  // to submiting the form details
  onSubmit() {
    this.attendanceDetails.createdDttm = new Date();
    this.attendanceDetails.createdSource = this.loginService.loggedInUser;
    this.attendanceDetails.createdSourceType = this.loginService.loggedInUser;
    this.apiService.addAttendanceDetails(this.attendanceDetails).subscribe((results) => { }, (error) => {
      this.router.navigateByUrl('/Attendance');
      this.ngOnDestroy();
    });
  }
}
