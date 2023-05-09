import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-attendance-details-edit',
  templateUrl: './attendance-details-edit.component.html',
  styleUrls: ['./attendance-details-edit.component.css']
})
export class AttendanceDetailsEditComponent implements OnInit, OnDestroy {

  // to hide the delete and add button we need who is loggedIn
  loggedInUser: string;

  // to show error which fields are not selected
  fieldSelected = true;

  // to show details screen while true and edit screen while false
  showAttendanceDetails = true;

  // for available option in form
  availability:any;

  attendanceDetails = {
    studentId: '',
    date: null,
    departmentId: null,
    available: null,
    checkIn: null,
    checkout: null,
    attendanceCount: null,
    createdSource: '',
    createdSourceType: '',
    createdDttm: null,
    modifiedSource: '',
    modifiedSourceType: '',
    modifiedDttm: null

  }

  //  to check whether any changes are made in from or not
  @ViewChild('attendanceDetailsForm') attendanceDetailsForm!: NgForm;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private apiService: APIService, private loginService: LoginService,
    private variableService: VariableService) { }

  ngOnInit() {
    this.availability=this.variableService.availability;
    this.loggedInUser = this.loginService.loggedInUser;

    //if the parameter value changes then use Obeservables
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.attendanceDetails.studentId = parm.get('id')?.substring(1);

      // getting all attendance details 
      this.apiService.fecthAttendanceByStudentId(this.attendanceDetails.studentId).subscribe((results: any) => {
        this.attendanceDetails = results;

        // to assing value to calender filed we need to convert to date 
        this.attendanceDetails.date = new Date(results.date);
        this.attendanceDetails.checkIn = new Date(results.checkIn);
        this.attendanceDetails.checkout = new Date(results.checkout);
        this.attendanceDetails.createdDttm = new Date(results.createdDttm);
        this.attendanceDetails.available = results.available.toString();
        if (results.modifiedDttm != '' && results.modifiedDttm != null) {
          this.attendanceDetails.modifiedDttm = new Date(results.modifiedDttm);
        }
        localStorage.setItem('path', 'Attendance/AttendanceDetails/:' + this.attendanceDetails.studentId);
      });
    });
  }

  // while edit mode is on, need to hide the details 
  editStudentDetails() {
    this.showAttendanceDetails = false;
  }

  ngOnDestroy(): void {
    this.loginService.setChildComponentRefresh(false);
  }

  // to exit from the page while editting the details
  canExitFromPage() {

    // if the edit mode is on, then below conditions will execute
    if (this.attendanceDetailsForm.dirty && this.attendanceDetailsForm.touched) {
      // in variable service canExit methods will show confirm dailog
      this.variableService.canExit('Attendance');
    }else {
      this.router.navigateByUrl('/Attendance');
      this.ngOnDestroy();
    }
  }

  // to update the student details 
  onSubmit() {

    // edit option is not there for user,otherwise we can store loggedInUser in a variable & then can assign that to modifiedSource & type
    this.attendanceDetails.modifiedSource = this.loggedInUser;
    this.attendanceDetails.modifiedSourceType = this.loggedInUser;

    // while on submitting the form , that time will taken
    this.attendanceDetails.modifiedDttm = new Date();
    this.apiService.updateAttendance(this.attendanceDetails).subscribe((results) => { }, (error) => {
      this.router.navigateByUrl('/Attendance');
      this.ngOnDestroy();
    });
  }
}

