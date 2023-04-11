import { Component, OnDestroy, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';
import { VariableService } from 'src/app/services/variable.service';
// import { StudentComponent } from '../student.component';



@Component({
  selector: 'app-student-details-edit',
  templateUrl: './student-details-edit.component.html',
  styleUrls: ['./student-details-edit.component.css'],

})
export class StudentDetailsEditComponent implements OnInit, OnDestroy {
  showStudentDetailes = true;
  // studentDetailesEdit = false;

  loggedInUser!: string;

  bloodGroupList = this.VariableService.bloodGroupList;
  departmentList = this.VariableService.departmentList;


  studentId: any={}

  // for min date in calender
  createdDttm = new Date()

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
    departmentId: 1,
    dateOfJoining: new Date(),
    createdDttm: new Date(),
    createdSource: "",
    createdSourceType: '',
    modifiedSource: 'admin',
    modifiedSourceType: 'admin',
    modifiedDttm: new Date()
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private APIService: APIService,  private ConfirmationService: ConfirmationService,
    private LoginService: LoginService, private VariableService: VariableService, 
    private MessageService: MessageService) { }

  @ViewChild('studentDetailsForm', { static: false }) studentDetailsForm!: NgForm;
 
  ngOnInit() {
    // this.studentDetails.bloodGroup = this.bloodGroupOption.type ;

    localStorage.setItem('path', 'Student/StudentDetails/:' + this.studentDetails.studentId + '')

    this.loggedInUser = this.LoginService.logged_in_user;

    //if the parameter value changes then use Obeservables
    this.MessageService.add({ severity: 'success', summary: 'success Message', detail: 'Student' + this.studentId + ' detailes added successfully', life: 3000 });

    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentId = parm.get('id')?.substring(1);
      this.APIService.findByStudentId(this.studentId).subscribe((results: any) => {
        console.log(results);
        this.studentDetails =results
        this.studentDetails.dob = new Date(results.dob);
        this.studentDetails.departmentId = Number(results.departmentId);
        this.studentDetails.dateOfJoining = new Date(results.dateOfJoining)
        console.log(this.studentDetails.department);
        

      })
    })

  }
  editStudentDetailes() {

    this.showStudentDetailes = false;
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
          this.router.navigate(['Student'])
          this.ngOnDestroy()
        },
        reject: () => {}
      });
      
    }
    else {
      // this.router.navigateByUrl('/Student')
      this.router.navigate(['Student'])
      this.ngOnDestroy()
    }
  }

  onSubmint() {
    console.log(";skdf");

    this.studentDetails.modifiedSource = 'admin';
    this.studentDetails.modifiedSourceType = 'admin';
    this.studentDetails.modifiedDttm = new Date()

    this.APIService.updateStudentDetails(this.studentDetails).subscribe((results) => { }, (error) => {
      console.log(this.studentDetails);
      this.MessageService.add({ severity: 'success', summary: 'success Message', detail: 'Student' + this.studentId + ' detailes added successfully' });
      this.router.navigate(['Student'])
      this.ngOnDestroy()

    });
    // this.router.navigateByUrl('/Student');

  }
}
