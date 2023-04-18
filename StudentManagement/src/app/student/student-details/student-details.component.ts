import { Component, OnDestroy, ViewChild, Input, OnInit, Sanitizer, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  imageSize=true;
  fieldSelected=true;
  // for min date in dob
  createdDttm = new Date()

  studentDetails = {
    studentId: null,
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
    modifiedDttm: null,

    imagePath: null,
    imageName:''
  }

  // selectedDepartment=''
  @ViewChild('studentDetailsForm') studentDetailsForm!: NgForm;

  constructor(private APIService: APIService, private router: Router, private activatedRoute: ActivatedRoute,
    private VariableService: VariableService, private ConfirmationService: ConfirmationService,
    private MessageService: MessageService, private LoginService: LoginService, private DomSanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.studentDetails.studentId = Number(this.VariableService.studentId);
    localStorage.setItem('path', 'Student/AddStudentDetails/:' + this.studentDetails.studentId + '')
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentDetails.studentId = parm.get('id')?.substring(1);
    })
  }

  onFileSelect(event) {

    if(event.target.files[0].size>30000){
      this.imageSize=false;
    }else{
      if (event.target.files[0]) {
        let file = event.target.files[0]
        this.imageSize=true;
        this.studentDetails.imageName=event.target.files[0].name;
        // console.log(this.studentDetails.imageName);
        
        let reader= new FileReader();
        reader.addEventListener('load', ()=>{
          this.studentDetails.imagePath=reader.result;
          console.log(this.studentDetails.imagePath);
          console.log(reader.result);
          console.log(reader);
          
          
          
        })
        reader.readAsDataURL(file)
        // let fileHnadlle = {
        //   file: file,
        //   url: this.DomSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        // }
        // let url=this.DomSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
        // this.DomSanitizer.bypassSecurityTrustUrl(this.studentDetails.imagePath);
        // this.studentDetails.imagePath = fileHnadlle.url.toString()
  
        // // console.log(url);
        // console.log(fileHnadlle);
        
        // console.log(this.studentDetails.imagePath);
  
  
      }
  }
   
    
  }

  onSubmit() {
    
    this.studentDetails.createdDttm = new Date()
    this.APIService.addStudent(this.studentDetails).subscribe((resluts) => {
      console.log(resluts);
      console.log('re');
      

    }, (err) => {
      console.log('err');
      
      console.log(err);
      console.log(this.studentDetails);

      this.MessageService.add({ severity: 'success', detail: 'Student' + this.studentDetails.studentId + ' detailes added successfully' });
      this.router.navigateByUrl('/Student');
      this.ngOnDestroy()
    })
    // console.log(studentDetailsForm);


  }

  ngOnDestroy(): void {
    this.LoginService.setChildComponentRefresh(false)
    this.fieldSelected=true;
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
        reject: () => { }
      });

    }
    else {
      // this.router.navigateByUrl('/Student')
      this.router.navigateByUrl('/Student');
      this.ngOnDestroy()
    }
  }
}
