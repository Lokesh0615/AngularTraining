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
  imageSize=true;
  imageEditOption=false;
  fieldSelected=true;

  studentId: any;

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
    departmentId: null,
    dateOfJoining: new Date(),
    createdDttm: new Date(),
    createdSource: "",
    createdSourceType: '',
    modifiedSource: 'admin',
    modifiedSourceType: 'admin',
    modifiedDttm: new Date(),

    imagePath:null,
    imageName:''

  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private APIService: APIService,  private ConfirmationService: ConfirmationService,
    private LoginService: LoginService, private VariableService: VariableService, 
    private MessageService: MessageService) { }

  @ViewChild('studentDetailsForm', { static: false }) studentDetailsForm!: NgForm;

  ngOnInit() {
    // this.studentDetails.bloodGroup = this.bloodGroupOption.type ;


    this.loggedInUser = this.LoginService.logged_in_user;
    
    //if the parameter value changes then use Obeservables

    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentId = parm.get('id')?.substring(1);
      this.APIService.findByStudentId(this.studentId).subscribe((results: any) => {
        console.log(results);
        this.studentDetails =results
        this.studentDetails.dob = new Date(results.dob);
        this.studentDetails.departmentId = Number(results.departmentId);
        this.studentDetails.dateOfJoining = new Date(results.dateOfJoining)
        this.studentDetails.createdDttm=new Date(results.createdDttm)
        if(results.modifiedDttm !=''){
          this.studentDetails.modifiedDttm=new Date(results.modifiedDttm)

        }
        console.log(results.bloodGroup);
        

        localStorage.setItem('path', 'Student/StudentDetails/:' + this.studentDetails.studentId + '')

        // console.log(this.studentDetails.department);
        // console.log(results.imagePath);
        // this.studentDetails.imageName=results.imageName;
        // // this.imagePath.nativeElement.name='lsos.jpg';
        // console.log(results.imageName);
        
        // this.imagePath.nativeElement.selected=results.imagePath;
        // // this.imagePath.nativeElement.name=results.imageName;

       
        
      })
    })

  }

  onFileSelect(event) {

    if(event.target.files[0].size>30000){
      this.imageSize=false;
    }else{
      if (event.target.files[0]) {
        let file = event.target.files[0]
        this.imageSize=true;
        let reader= new FileReader();
        reader.addEventListener('load', ()=>{
          if(this.imageEditOption){
            this.studentDetails.imagePath=reader.result;
            this.studentDetails.imageName=event.target.files[0].name;

          }
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

  showImageEdit(status:boolean){
    this.imageEditOption=status; 
  }

  editStudentDetailes() {

    this.showStudentDetailes = false;
 
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
    console.log(this.studentDetailsForm);

    this.studentDetails.modifiedSource = 'admin';
    this.studentDetails.modifiedSourceType = 'admin';
    this.studentDetails.modifiedDttm = new Date()

    this.APIService.updateStudentDetails(this.studentDetails).subscribe((results) => { }, (error) => {
      console.log(this.studentDetails);
      this.MessageService.add({ severity: 'success', detail: 'Student' + this.studentId + ' detailes added successfully' });
      this.router.navigate(['Student'])
      this.ngOnDestroy()

    });
    // this.router.navigateByUrl('/Student');

  }
}
