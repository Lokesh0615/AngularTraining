import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VariableService } from '../services/variable.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],

})
export class StudentComponent implements OnInit {

  // for paginator dropdown
  paginatorDropdown = [{ rows: 5 }, { rows: 10 }, { rows: 15 }]
  // to display number of record selected in dropdown
  paginatorValue: number;
  // to display the student Id check dialog box
  dialogShow: boolean = false;
  // for table header names
  studentTableHeaders = this.variableService.studentTableHeaders;
  studentsData: any = [];
  // to dispay the childcomponent details
  showStudentDetails: boolean;
  childComponentOpend: boolean
  // to check whether loggedIn user is admin or not
  loggedInUser: string;
  // to check the student id
  studentId: string;
  // to show error message while input fields are empty
  fieldSelected = true;

  constructor(private apiService: APIService, private messageService: MessageService, private route: Router,
    private activatedRoute: ActivatedRoute, private variableService: VariableService,
    private confirmationService: ConfirmationService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.fetchingAllStudentDetailes()
    let storage = localStorage;
    storage.setItem('icons', JSON.stringify({ 'title': 'Student', 'icon': 'pi pi-table' }))
    storage.setItem('path', 'Student')
    this.childComponentOpend = JSON.parse(storage.getItem('admin')).childComponentOpend;
    this.showStudentDetails = false;
    this.loggedInUser = this.loginService.loggedInUser;
  }

  // geting all thedetails of students from database
  fetchingAllStudentDetailes() {
    // when the chlid componet is closed then again all the details will load, to prevent that, need to empty the array
    this.studentsData = []
    this.apiService.fetchAllStudentsDetails().subscribe((results) => {
      this.studentsData = results;
    })
  }

  // to show the student id ckecking dialog box
  showStudentIdDialog() {
    this.dialogShow = true;
    this.studentId = ''
    this.fieldSelected = true;
  }

  // to check the student id before navigating to the form page
  checkStudentId() {
    let stdIdExist = this.studentsData.find((list) => list.studentId == this.studentId);
    if (!stdIdExist) {
      this.dialogShow = false;
      this.showStudentDetails = false;
      this.childComponentOpend = true
      this.loginService.setChildComponentRefresh(true)
      this.route.navigate(['AddStudentDetails/:' + this.studentId + ''], { relativeTo: this.activatedRoute })
      this.studentId = ''
    } else {
      //  if student id exist show error message
      this.messageService.add({ severity: 'error', detail: 'Student Id already Exists' });
    }
  }

  // to delete the record by student id
  deleteByStdId(stdId: string) {
    this.confirmationService.confirm({
      message: 'Are you want to delete the record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deleteByStudentId(stdId).subscribe((results) => { }, (error) => {
          this.messageService.add({ severity: 'success', detail: 'Record is deleted successfully' });
          this.fetchingAllStudentDetailes();
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', detail: 'Record is not Deleted' });
      }
    });
  }

  // to navigate to the details screen
  studentDetailes(studentId: string) {
    this.childComponentOpend = true;
    this.loginService.setChildComponentRefresh(true)
    this.route.navigate(['StudentDetails/:' + studentId + ''], { relativeTo: this.activatedRoute })
  }
}
