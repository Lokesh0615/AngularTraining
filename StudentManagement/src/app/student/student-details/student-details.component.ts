import { Component, OnDestroy, ViewChild, OnInit, } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit, OnDestroy {

  //  for bloodgroup dropdown values
  bloodGroupList: any;

  // for department dropdown
  departmentList: any;

  // to check whether the image is lessthan 30kb or not
  imageSize = true;

  // to show error which fields are not selected
  fieldSelected = true;

  // for min date in dob
  createdDttm = new Date();

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
    createdSource: '',
    createdSourceType: '',
    modifiedSource: '',
    modifiedSourceType: '',
    modifiedDttm: '',
    imagePath: null,
    imageName: ''
  }

  // to check the form whether valid or not
  @ViewChild('studentDetailsForm') studentDetailsForm!: NgForm;

  constructor(private apiService: APIService, private router: Router, private activatedRoute: ActivatedRoute,
    private variableService: VariableService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.bloodGroupList = this.variableService.bloodGroupList;
    this.departmentList = this.variableService.departmentList;
    this.studentDetails.createdSource = this.loginService.loggedInUser;
    this.studentDetails.createdSourceType = this.loginService.loggedInUser;
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentDetails.studentId = parm.get('id')?.substring(1);
      console.log(this.studentDetails.studentId);
      
      localStorage.setItem('path', 'Student/AddStudentDetails/:' + this.studentDetails.studentId);
    });
  }

  //  to select the file 
  onFileSelect(event) {
    // checking the file size
    if (event.target.files[0].size > 30000) {
      this.imageSize = false;
    } else {
      let file = event.target.files[0];
      this.imageSize = true;
      // setting imageName
      this.studentDetails.imageName = event.target.files[0].name;
      let reader = new FileReader();
      reader.addEventListener('load', () => {
        // converting image to url
        this.studentDetails.imagePath = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  // submiting the form
  onSubmit() {
    this.studentDetails.createdDttm = new Date();
    this.apiService.addStudent(this.studentDetails).subscribe((resluts) => { }, (error) => {
      this.router.navigateByUrl('/Student');
      this.ngOnDestroy();
    });
  }

  //  to check whether can exit or not from editing the form
  canExitFromPage() {
    if (this.studentDetailsForm.dirty && this.studentDetailsForm.touched) {
      // in variable service canExit methods will show confirm dailog
      this.variableService.canExit('Student');
    } else {
      // if the form is not dirty then exit form the page
      this.router.navigateByUrl('/Student');
      this.ngOnDestroy();
    }
  }

  ngOnDestroy(): void {
    this.loginService.setChildComponentRefresh(false);
    this.fieldSelected = true;
  }
}
