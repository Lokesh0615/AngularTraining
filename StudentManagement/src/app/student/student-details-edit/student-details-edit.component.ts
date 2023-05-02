import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';



@Component({
  selector: 'app-student-details-edit',
  templateUrl: './student-details-edit.component.html',
  styleUrls: ['./student-details-edit.component.css'],

})
export class StudentDetailsEditComponent implements OnInit, OnDestroy {

  showStudentDetailes = true;
  // to check logedin user
  loggedInUser: string;
  //  for bloodgroup dropdown values
  bloodGroupList = this.variableService.bloodGroupList;
  // for department dropdown
  departmentList = this.variableService.departmentList;
  // to avoid image size morethan 30kb
  imageSize = true;
  // to update the image
  imageEditOption = false;
  // to show error which fields are not selected
  fieldSelected = true;

  // for min date in calender
  todaysDate = new Date()

  studentDetails = {
    studentId: '',
    firstName: '',
    lastName: '',
    dob: new Date(),
    gender: '',
    bloodGroup: '',
    phoneNumber: '',
    address: '',
    mailId: '',
    department: '',
    // department id is number so, we cant give empty string
    departmentId: null,
    dateOfJoining: new Date(),
    createdDttm: new Date(),
    createdSource: "",
    createdSourceType: '',
    modifiedSource: '',
    modifiedSourceType: '',
    modifiedDttm:null,

    // imagepath is not assignable if we give empty string
    imagePath: null,
    imageName: ''

  }
  // to check the form whether valid or not
  @ViewChild('studentDetailsForm') studentDetailsForm!: NgForm;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private apiService: APIService, private loginService: LoginService,
    private variableService: VariableService,) { }


  ngOnInit() {
    this.loggedInUser = this.loginService.loggedInUser;
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentDetails.studentId = parm.get('id')?.substring(1);
      this.apiService.fetchByStudentId(this.studentDetails.studentId).subscribe((results: any) => {
        this.studentDetails = results
        this.studentDetails.dob = new Date(results.dob);
        this.studentDetails.departmentId = Number(results.departmentId);
        this.studentDetails.dateOfJoining = new Date(results.dateOfJoining)
        this.studentDetails.createdDttm = new Date(results.createdDttm)
        // if we dont apply condition, if modified date is notthere, then also it we disply todays date
        if (results.modifiedDttm != '') {
          this.studentDetails.modifiedDttm = new Date(results.modifiedDttm)
        }
        localStorage.setItem('path', 'Student/StudentDetails/:' + this.studentDetails.studentId + '')
      })
    })
  }

  // to bind the image path and name
  onFileSelect(event) {
    // if file size more then 30kb, need to show error
    if (event.target.files[0].size > 30000) {
      this.imageSize = false;
    } else {
      if (event.target.files[0]) {
        let file = event.target.files[0]
        this.imageSize = true;
        // getting image url 
        let reader = new FileReader();
        reader.addEventListener('load', () => {
          if (this.imageEditOption) {
            this.studentDetails.imagePath = reader.result;
            this.studentDetails.imageName = event.target.files[0].name;
          }
        })
        reader.readAsDataURL(file)
      }
    }
  }

  // to edit image
  showImageEdit(status: boolean) {
    this.imageEditOption = status;
  }
  // to disply edit screen
  editStudentDetailes() {
    this.showStudentDetailes = false;
  }

  ngOnDestroy(): void {
    this.loginService.setChildComponentRefresh(false)
    this.fieldSelected = true;
  }

  // to exit from page, while in edit mode
  canExitFromPage() {
    if (this.studentDetailsForm.dirty && this.studentDetailsForm.touched) {
      // in variable service canExit methods will show confirm dailog
      this.variableService.canExit('Student')
    }
    // if the form is not dirty then exit form the page
    else {
      this.router.navigate(['Student'])
      this.ngOnDestroy()
    }
  }

  // to submit the edited student data
  onSubmint() {
    this.studentDetails.modifiedSource =this.loggedInUser;
    this.studentDetails.modifiedSourceType = this.loggedInUser;
    this.studentDetails.modifiedDttm = new Date()
    this.apiService.updateStudentDetails(this.studentDetails).subscribe((results) => { }, (error) => {
      this.router.navigate(['Student'])
      this.ngOnDestroy()
    });
  }
}
