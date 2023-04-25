import { Component, OnInit, QueryList, ViewChildren, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { LoginService } from '../services/login.service';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],

})

export class AttendanceComponent implements OnInit {

  paginatorDropdown = [{ rows: 5 }, { rows: 10 }, { rows: 15 }]
  // to display number of record selected in dropdown
  paginatorValue: number;
  //  for table header
  attendanceTableHeader = this.variableService.attendanceTableHeader;
  // to check student Id we need 
  studentId: string;
  departmentId: string;
  fieldSelected = true;
  // to check loggedIn user adimn or not
  loggedInUser!: string;
  // to display the student Id check dialog box
  dialogShow: boolean = false;
  attendanceData: any = [];
  // to hide the paginator
  attendanceDataLength: number;
  // to dispay the childcomponent details
  showAttendanceDetails: boolean;
  childComponentOpend: boolean;
  // to check student id and department id in student data
  studentsData: any = [];

  // to hide the paginator while global search is not found
  @ViewChildren('checktableRows') checktableRows!: QueryList<any>;

  constructor(private apiService: APIService, private messageService: MessageService, private route: Router,
    private activatedRoute: ActivatedRoute, private variableService: VariableService, private loginService: LoginService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    let storage = localStorage;
    storage.setItem('path', 'Attendance')
    storage.setItem('icons', JSON.stringify({ 'title': 'Attendance', 'icon': 'pi pi-table' }))
    this.childComponentOpend = JSON.parse(storage.getItem('admin')).childComponentOpend;
    this.showAttendanceDetails = false;
    this.loggedInUser = this.loginService.loggedInUser;

    this.fetchingAttendanceDetailes()
    this.showAttendanceDetails = true;
    // i need to check whether studentId And department Id matches or not , so i need student data
    this.apiService.fetchAllStudentsDetails().subscribe((results) => {
      this.studentsData = results
    })
  }

  // to get all attendance details
  fetchingAttendanceDetailes() {
    this.attendanceData = []
    this.apiService.fetchAllAttendanceDetailes().subscribe((results) => {
      for (let result in results) {
        // need to convert department id to number and also available to string
        let data = this.variableService.getFormatedAttendanceData(results[result])
        this.attendanceData.push(data);
      }
      this.attendanceDataLength = this.attendanceData.length;
    }, (error) => { })
  }


  // to hide the paginator while search data is lessthan paginatorvalue
  hidePaginator() {
    // we can not try to assign the lenth to paginatorvalue, bcz in padinator dropdown its always shows 5, so the paginator value also be 5, 
    if (this.checktableRows.length < this.paginatorValue) {
      this.attendanceDataLength = this.checktableRows.length;
    } else {
      this.attendanceDataLength = this.attendanceData.length
    }
  }

  // to show the dialoge box to check the student id and department id
  showDialog() {
    this.studentId = '';
    this.departmentId = '';
    this.dialogShow = true;
    this.fieldSelected = true;
  }

  // to delete the record by student id and departmen id
  deleteAttendanceRecord(studentId: string, departmentId: string) {
    this.confirmationService.confirm({
      message: 'Are you want to delete the record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', detail: 'Record is deleted successfully' });
        this.apiService.deleteAttendanceByStdIdDeptId(studentId, departmentId).subscribe((results) => { }, (error) => {
          console.log(error);
          this.fetchingAttendanceDetailes()
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', detail: 'Record is not Deleted' });
      }
    });
  }

  // to navigato to the detail screen
  viewAttendanceDetailes(studentId: string) {
    this.childComponentOpend = true;
    this.loginService.setChildComponentRefresh(true)
    this.route.navigate(['AttendanceDetails/:' + studentId + ''], { relativeTo: this.activatedRoute })
  }

  checkStudentIdAndDepartmentId() {
    // to check student id and department id in student data
    let checkStudIdAndDeptId = this.studentsData.some((list) => {
      return (list.departmentId == this.departmentId && list.studentId == this.studentId)
    });
    //  to check student id in attendance data
    let checkAttendance = this.attendanceData.some((list) => {
      return list.studentId == this.studentId
    })
    // if student id and department id is availbale in student data and student id not available in attendance data
    if (!checkAttendance) {
      // if studnet id not exist in attendance data then only check for department id and student id in student data;
      if (checkStudIdAndDeptId) {
        this.dialogShow = false;
        this.showAttendanceDetails = false
        this.childComponentOpend = true
        this.loginService.setChildComponentRefresh(true)
        this.route.navigate(['AddAttendanceDetails/:' + this.studentId + '/:' + this.departmentId + ''], { relativeTo: this.activatedRoute })
      } else {
        // if student id and departmnet id is already exist in student data show error messege
        this.messageService.add({ severity: 'error', detail: 'Student Id and Department Id dose not exist' });
      }
      // if ther student id already exist i attendance details then no need to check the student id and department id in student data
    } else {
      this.messageService.add({ severity: 'error', detail: 'Student Id already exist in Attendance details' });
    }
  }
}
