import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { ConfirmExitService } from 'src/app/services/confirmExit.service';
import { LoginService } from 'src/app/services/login.service';
import { StudentDetailesService } from 'src/app/services/studentDetailes';
import { VariableService } from 'src/app/services/variable.service';
import { StudentComponent } from '../student.component';



@Component({
  selector: 'app-student-details-edit',
  templateUrl: './student-details-edit.component.html',
  styleUrls: ['./student-details-edit.component.css'],

})
export class StudentDetailsEditComponent implements OnInit, OnDestroy {
  showStudentDetailes = true;
  studentData: any = {};
  // studentDetailesEdit = false;

  bloodGroupList=[
    {type:"O+"},
    {type:"O-"},
    {type:"A+"},
    {type:"A-"},
    {type:"B+"},
    {type:"B-"},
    {type:"AB+"},
    {type:"AB-"},
]  ;
departmentList = this.VariableService.departmentList;

  // genderSelected:string|null=null

  studentId!: any;
  firstName!: string;
  lastName!: string;
  dob!: Date;
  gender!: string;
  bloodGroupOption;
  phoneNumber!: string;
  address!: string;
  mailId!: string;
  department!: string;
  departmentId!: any;
  createdDttm = new Date();
  createdSource = "admin";
  createdSourceType = 'admin'
  modifiedSource: string = '';
  modifiedSourceType: string = '';
  modifiedDttm!: Date;


  studentDetails = {
    studentId:'' ,
    firstName:'',
    lastName: '',
    dob: new Date(),
    gender: this.gender,
    bloodGroup:'',
    phoneNumber: this.phoneNumber,
    address: this.address,
    mailId: this.mailId,
    department: this.department,
    departmentId: this.departmentId,
    dateOfJoining:new Date(),
    createdDttm: new Date(),
    createdSource: "",
    createdSourceType: '',
    modifiedSource: 'admin',
    modifiedSourceType: 'admin',
    modifiedDttm: new Date()
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private APIService: APIService, private ConfirmExitService: ConfirmExitService,
    private LoginService: LoginService, private VariableService: VariableService, private StudentComponent: StudentComponent,
    private MessageService: MessageService) { }

  @ViewChild('studentDetailsForm', { static: false }) studentDetailsForm!: NgForm;
  ngOnInit() {
    // this.studentDetails.bloodGroup = this.bloodGroupOption.type ;

    //if the parameter value changes then use Obeservables
    this.MessageService.add({ severity: 'success', summary: 'success Message', detail: 'Student' + this.studentId + ' detailes added successfully', life: 3000 });

    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentId = parm.get('id')?.substring(1);
      this.APIService.findByStudentId(this.studentId).subscribe((results:any) => {
        console.log(results);

        this.studentData = results;

        this.studentDetails.studentId = results.studentId;
        this.studentDetails.firstName = results.firstName;
        this.studentDetails.lastName = results.lastName;
        this.studentDetails.dob = new Date(results.dob);
        this.studentDetails.gender = results.gender;
        this.studentDetails.bloodGroup = results.bloodGroup ;
        this.studentDetails.phoneNumber = results.phoneNumber;
        this.studentDetails.address = results.address;
        this.studentDetails.mailId = results.mailId;
        this.studentDetails.department =results.department;
        this.studentDetails.departmentId = results.departmentId;
        this.studentDetails.dateOfJoining=new Date(this.studentData.dateOfJoining),
        this.studentDetails.createdSource = results.createdSource;
        this.studentDetails.createdSourceType = results.createdSource;
        this.studentDetails.createdDttm = results.createdDttm;
        this.studentDetails.modifiedSource = results.modifiedSource;
        this.studentDetails.modifiedSourceType = results.modifiedSourceType;
        this.studentDetails.modifiedDttm = results.modifiedDttm;

      })
    })

  }

  editStudentDetailes() {
    this.showStudentDetailes = false;
    // this.studentDetailesEdit = true;
    console.log("ad");
    console.log(this.studentDetailsForm);

    console.log(this.studentData.mailId);
    console.log(this.studentData.gender);


    // this.studentDetailsForm.form.setValue({
    //   studentId: this.studentData.studentId,
    //   dob: new Date(this.studentData.dob),
    //   gender: this.studentData.gender,
    //   bloodGroup: this.studentData.bloodGroup,
    //   phoneNumber: this.studentData.phoneNumber,
    //   address: this.studentData.address,
    //   department: this.studentData.department,
    //   departmentId: this.studentData.departmentId,
    //   mailId: this.studentData.mailId,
    //   firstName: this.studentData.firstName,
    //   lastName: this.studentData.lastName,
    //   dateOfJoining: new Date(this.studentData.dateOfJoining),
    //   createdSource: this.studentData.createdSource,
    //   createdSourceType: this.studentData.createdSourceType,
    //   createdDttm: this.studentData.createdDttm,
    //   modifiedSource: this.studentData.modifiedSource,
    //   modifiedSourceType: this.studentData.modifiedSourceType,
    //   modifiedDttm: this.studentData.modifiedDttm
    // })
    console.log(new Date(this.studentData.dob));
  }

  ngOnDestroy(): void {
    this.router.navigate(['Student'])
    this.LoginService.setChildComponentRefresh(false)
  }
  canExit() {
    if (this.studentDetailsForm.dirty && this.studentDetailsForm.touched) {
      if (this.ConfirmExitService.canExit()) {
        this.router.navigateByUrl('/Student')
      }
    } else {
      this.router.navigateByUrl('/Student')
    }
  }

  onSubmint() {
    // this.VariableService.modifiedSource=this.LoginService.logged_in_user;
    // this.VariableService.modifiedSourceType=this.LoginService.logged_in_user;
    // this.VariableService.modifiedDttm=new Date();
    console.log(this.bloodGroupOption.type);
    
    this.studentDetails.bloodGroup=this.bloodGroupOption.type;
    this.MessageService.add({ severity: 'success', summary: 'success Message', detail: 'Student' + this.studentId + ' detailes added successfully' });

    this.studentDetailsForm.form.patchValue({
      // modifiedSource:this.LoginService.logged_in_user,
      modifiedSourceType: this.LoginService.logged_in_user,
      modifiedDttm: new Date().toISOString()
    })
    console.log(this.studentDetailsForm.value);

    this.APIService.updateStudentDetails(this.studentDetails).subscribe((results) => { }, (error) => {
      // console.log(this.studentDetailsForm.value);
console.log(this.studentDetails);

      // console.log(error);
    });
    this.router.navigateByUrl('/Student');
    this.ngOnDestroy()

  }
}
