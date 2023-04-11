import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { StudentDetailesService } from '../services/studentDetailes';
import { ActivatedRoute, Router } from '@angular/router';
import { VariableService } from '../services/variable.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],

})
export class StudentComponent implements OnInit {

  paginatorDropdown=[{rows:5}, {rows:10}, {rows:15}]
  paginatorValue:number;
  dialogShow:boolean=false;
  studentTableHeaders=this.VariableService.studentTableHeaders;
  studentsData:any=[];
  showStudentDetails!:boolean;
  childComponentOpend:boolean
  loggedInUser!:string;
  // studentTableHeaders=this.VariableService.studentTableHeaders;

  @ViewChild('checkStdId') checkStdId!:ElementRef;
  constructor(private APIService:APIService, private MessageService:MessageService, private route:Router ,
               private activatedRoute:ActivatedRoute, private VariableService:VariableService,
               private ConfirmationService:ConfirmationService, private LoginService:LoginService ){

  }
  
  ngOnInit(): void {
    localStorage.setItem('icons',JSON.stringify({'title':'Student', 'icon':'pi pi-table'}))
    this.getAllStudentDetailes()
    this.showStudentDetails=false;
    this.childComponentOpend=this.LoginService.userData.childComponentOpend;
    console.log(this.childComponentOpend);
    
    this.VariableService.title='Student Details'
    this.loggedInUser=this.LoginService.logged_in_user;
    localStorage.setItem('path','Student')

    
  }
  showDialog(){
    this.dialogShow=true;
    this.checkStdId.nativeElement.value='';
  }
  getAllStudentDetailes(){
    this.studentsData=[]
    console.log(this.studentsData);
    
    this.APIService.findAllStudents().subscribe((results)=>{
      // this.studentsData=results;
      for(let result of Object.values(results)){
        console.log(result);
        // this.studentsData=results;
        let data=this.VariableService.getFormatedStudentData(result)
        this.studentsData.push(data)
        // console.log(data);
       
      }
    })
    console.log(this.studentsData);
    
  }

  checkStudentId(stdId:string){
    let stdIdExist=this.studentsData.find((list)=> list.studentId==Number(stdId));
    if(!stdIdExist){
      console.log("nextpage");
      this.route.navigate(['AddStudentDetails/:'+stdId+''],{relativeTo:this.activatedRoute})
      this.dialogShow=false;
      this.checkStdId.nativeElement.value='';
      this.showStudentDetails=false;
      this.VariableService.studentId=stdId
      this.childComponentOpend=true
      this.LoginService.setChildComponentRefresh(true)


    }else{
      this.MessageService.add({severity:'error', summary:'error Message', detail:'Student Id already Exists'});
    }
  }


  deleteByStdId(stdId:number){
    this.ConfirmationService.confirm({
        message: 'Are you want to delete the record?',
        header: 'Confirmation',
        // icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // console.log("acc");
          
          this.MessageService.add({severity:'success', summary:'Confirmed', detail:'Record is deleted successfully'});
          this.APIService.deleteByStudentId(stdId).subscribe((results)=>{ }, (error)=>{
            console.log(error);
            this.getAllStudentDetailes();
          })
        },
        reject: () => {
          // console.log("no");
          
          this.MessageService.add({severity:'error', summary:'Rejected', detail:'Record is not Deleted'});
        }
    });
}

  // deleteByStdId(stdId:string){
  //   this.APIService.deleteByStudentId(stdId).subscribe((results)=>{ }, (error)=>{
  //     console.log(error);
  //     this.getAllStudentDetailes();
  //   })
  // }
  studentDetailesEdit(studentId:string){
    this.route.navigate(['StudentDetails/:'+studentId+''],{relativeTo:this.activatedRoute})
    this.childComponentOpend=true;
    this.LoginService.setChildComponentRefresh(true)

  }

  selectedStudenstData1:any=[]
}
