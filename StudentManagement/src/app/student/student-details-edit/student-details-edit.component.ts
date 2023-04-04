import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { ConfirmExitService } from 'src/app/services/confirmExit.service';
import { LoginService } from 'src/app/services/login.service';
import { StudentDetailesService } from 'src/app/services/studentDetailes';
import { VariableService } from 'src/app/services/variable.service';
import { StudentComponent } from '../student.component';

@Component({
  selector: 'app-student-details-edit',
  templateUrl: './student-details-edit.component.html',
  styleUrls: ['./student-details-edit.component.css']
})
export class StudentDetailsEditComponent implements OnInit, OnDestroy {
  showStudentDetailes = true;
  // studentDetailesEdit = false;
  StudentId!: any;
  studentData: any={};
  modifiedSource:string='';
  modifiedSourceType:string='';
  modifiedDttm!:Date;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, 
              private APIService: APIService, private ConfirmExitService:ConfirmExitService,
              private LoginService:LoginService,  private VariableService:VariableService, private StudentComponent:StudentComponent) { }

  @ViewChild('studentDetailsForm', {static:false}) studentDetailsForm!: NgForm;
  ngOnInit() {
    //if the parameter value changes then use Obeservables
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.StudentId = parm.get('id')?.substring(1);
      this.APIService.findByStudentId(this.StudentId).subscribe((results) => {
      console.log(results);
      
      this.studentData = results;
    })
    })
    
  }

  editStudentDetailes() {
    this.showStudentDetailes = false;
    // this.studentDetailesEdit = true;
    console.log("ad");
    
    console.log(this.studentData.mailId);
    console.log(this.studentData.gender);
    
    
    this.studentDetailsForm.form.setValue({
      studentId:this.studentData.studentId,
      dob:this.studentData.dob,
      gender:this.studentData.gender,
      bloodGroup:this.studentData.bloodGroup,
      phoneNumber:this.studentData.phoneNumber,
      address:this.studentData.address,
      department:this.studentData.department,
      departmentId:this.studentData.departmentId,
      mailId:this.studentData.mailId,
      firstName:this.studentData.firstName,
      lastName:this.studentData.lastName,
      dateOfJoining:this.studentData.dateOfJoining,
      createdSource:this.studentData.createdSource,
      createdSourceType:this.studentData.createdSourceType,
      createdDttm:this.studentData.createdDttm,
      modifiedSource:this.studentData.modifiedSource,
      modifiedSourceType:this.studentData.modifiedSourceType,
      modifiedDttm:this.studentData.modifiedDttm
    })
    console.log(new Date(this.studentData.dob));
  }

  ngOnDestroy(): void {
    this.router.navigate(['Student'])
    this.LoginService.setChildComponentRefresh(false)
  }
  canExit(){
    if(this.studentDetailsForm.dirty && this.studentDetailsForm.touched){
      if(this.ConfirmExitService.canExit()){
        this.router.navigateByUrl('/Student')
      }
    }else{
      this.router.navigateByUrl('/Student')
    }
  }

  onSubmint(){
    // this.VariableService.modifiedSource=this.LoginService.logged_in_user;
    // this.VariableService.modifiedSourceType=this.LoginService.logged_in_user;
    // this.VariableService.modifiedDttm=new Date();
    this.studentDetailsForm.form.patchValue({
      modifiedSource:'loeks',
      modifiedSourceType:'lokehs',
      modifiedDttm:new Date().toISOString()
    })
    console.log(this.studentDetailsForm.value);

    this.APIService.updateStudentDetails(this.VariableService.formatedStudentData(this.studentDetailsForm.value)).subscribe((results)=>{}, (error)=>{
      // console.log(this.studentDetailsForm.value);
      
      // console.log(error);
  });
    // this.router.navigateByUrl('/Student');
  }
}
