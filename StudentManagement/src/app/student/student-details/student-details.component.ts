import { Component, OnDestroy, ViewChild, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, OnDestroy {



  bloodGroupList = this.VariableService.bloodGroupList;
  departmentList = this.VariableService.departmentList;

  // for min date in dob
  createdDttm = new Date()

  studentDetails = {
    studentId: null,
    firstName: '',
    lastName: '',
    dob: null,
    gender: '',
    bloodGroup: '',
    phoneNumber: '',
    address: '',
    mailId: '',
    department: '',
    departmentId: null,
    dateOfJoining: null,
    imagePath:'',
    createdDttm: null,
    createdSource: "admin",
    createdSourceType: 'admin',
    modifiedSource: '',
    modifiedSourceType: '',
    modifiedDttm: null
  }

  // selectedDepartment=''
  @ViewChild('studentDetailsForm') studentDetailsForm!: NgForm;
  constructor(private APIService: APIService, private router: Router, private activatedRoute: ActivatedRoute,
    private VariableService: VariableService,  private ConfirmationService: ConfirmationService,
    private MessageService: MessageService, private LoginService: LoginService) { }


  ngOnInit(): void {
    this.studentDetails.studentId = Number(this.VariableService.studentId);
    localStorage.setItem('path','Student/AddStudentDetails/:'+this.studentDetails.studentId+'')
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentDetails.studentId = parm.get('id')?.substring(1);
  })
}


  onSubmit() {

    this.studentDetails.createdDttm = new Date()
    this.APIService.addStudent(this.studentDetails).subscribe((resluts)=>{
      console.log(resluts);
      
    }, (err)=>{
      console.log(err);
      this.MessageService.add({ severity: 'success', summary: 'success Message', detail: 'Student' + this.studentDetails.studentId + ' detailes added successfully' });
      this.ngOnDestroy()
    })
    // console.log(studentDetailsForm);
    

  }

  ngOnDestroy(): void {
    this.LoginService.setChildComponentRefresh(false)
  }
  canExit() {
    if (this.studentDetailsForm.dirty && this.studentDetailsForm.touched) {
      // if (this.ConfirmExitService.canExit()) {
      // this.router.navigateByUrl('/Student')
      this.ConfirmationService.confirm({
        message: 'Do you want to exit',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.router.navigateByUrl('/Student');
          this.ngOnDestroy()
        },
        reject: () => {}
      });
      
    }
    else {
      // this.router.navigateByUrl('/Student')
      this.router.navigateByUrl('/Student');
      this.ngOnDestroy()
    }
  }
}
