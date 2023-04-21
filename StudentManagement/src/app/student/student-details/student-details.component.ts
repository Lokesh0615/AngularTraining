import { Component, OnDestroy, ViewChild, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, OnDestroy {

  bloodGroupList = this.variableService.bloodGroupList;
  departmentList = this.variableService.departmentList;
  imageSize = true;
  fieldSelected = true;
  // for min date in dob
  createdDttm = new Date()

  studentDetails = {
    studentId: '',
    firstName: '',
    lastName: '',
    dob: undefined,
    gender: undefined,
    bloodGroup: '',
    phoneNumber: '',
    address: '',
    mailId: '',
    department: undefined,
    departmentId: undefined,
    dateOfJoining: undefined,
    createdDttm: null,
    createdSource: "admin",
    createdSourceType: 'admin',
    modifiedSource: '',
    modifiedSourceType: '',
    modifiedDttm: '',

    imagePath: null,
    imageName: ''
  }

  @ViewChild('studentDetailsForm') studentDetailsForm!: NgForm;

  constructor(private apiService: APIService, private router: Router, private activatedRoute: ActivatedRoute,
    private variableService: VariableService, private confirmationService: ConfirmationService, private loginService: LoginService,) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentDetails.studentId = parm.get('id')?.substring(1);
      localStorage.setItem('path', 'Student/AddStudentDetails/:' + this.studentDetails.studentId + '')

    })
  }

  onFileSelect(event) {
    if (event.target.files[0].size > 30000) {
      this.imageSize = false;
    } else {
      if (event.target.files[0]) {
        let file = event.target.files[0]
        this.imageSize = true;
        this.studentDetails.imageName = event.target.files[0].name;

        let reader = new FileReader();
        reader.addEventListener('load', () => {
          this.studentDetails.imagePath = reader.result;
        })
        reader.readAsDataURL(file)
      }
    }
  }

  onSubmit() {
    this.studentDetails.createdDttm = new Date()
    this.apiService.addStudent(this.studentDetails).subscribe((resluts) => {

    }, (err) => {
      this.router.navigateByUrl('/Student');
      this.ngOnDestroy()
    })
  }

  ngOnDestroy(): void {
    this.loginService.setChildComponentRefresh(false)
    this.fieldSelected = true;
  }

  canExit() {
    if (this.studentDetailsForm.dirty && this.studentDetailsForm.touched) {
      this.confirmationService.confirm({
        message: 'Do you want to exit',
        header: 'Confirmation',
        accept: () => {
          this.router.navigateByUrl('/Student');
          this.ngOnDestroy()
        },
        reject: () => { }
      });
    }
    else {
      this.router.navigateByUrl('/Student');
      this.ngOnDestroy()
    }
  }
}
