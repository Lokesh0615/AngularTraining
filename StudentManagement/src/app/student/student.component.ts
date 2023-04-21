import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
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
  studentTableHeaders=this.variableService.studentTableHeaders;
  studentsData:any=[];
  showStudentDetails!:boolean;
  childComponentOpend:boolean
  loggedInUser!:string;
  studentId:string;
  fieldSelected=true;

  constructor(private apiService:APIService, private messageService:MessageService, private route:Router ,
               private activatedRoute:ActivatedRoute, private variableService:VariableService,
               private confirmationService:ConfirmationService, private loginService:LoginService ){ }
  
  ngOnInit(): void {
    let storage=localStorage;
    storage.setItem('icons',JSON.stringify({'title':'Student', 'icon':'pi pi-table'}))
    storage.setItem('path','Student')
    this.childComponentOpend=JSON.parse(storage.getItem('admin')).childComponentOpend;
    this.getAllStudentDetailes()
    this.showStudentDetails=false;    
    this.loggedInUser=this.loginService.loggedInUser;
    
  }
  showDialog(){
    this.dialogShow=true;
    this.studentId=''
    this.fieldSelected=true;
  }
  getAllStudentDetailes(){
    this.studentsData=[]
    this.apiService.fetchAllStudentsDetails().subscribe((results)=>{
      this.studentsData=results;
    })
    
  }

  checkStudentId(){
    let stdIdExist=this.studentsData.find((list)=> list.studentId==this.studentId);
    if(!stdIdExist){
      this.dialogShow=false;
      this.showStudentDetails=false;
      this.childComponentOpend=true
      this.loginService.setChildComponentRefresh(true)
      this.route.navigate(['AddStudentDetails/:'+this.studentId+''],{relativeTo:this.activatedRoute})
      this.studentId=''
    }else{
      this.messageService.add({severity:'error', detail:'Student Id already Exists'});
    }
  }


  deleteByStdId(stdId:number){
    this.confirmationService.confirm({
        message: 'Are you want to delete the record?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.apiService.deleteByStudentId(stdId).subscribe((results)=>{ }, (error)=>{
            this.messageService.add({severity:'success', detail:'Record is deleted successfully'});
            this.getAllStudentDetailes();
          })
        },
        reject: () => {
          this.messageService.add({severity:'error', detail:'Record is not Deleted'});
        }
    });
}

  studentDetailesEdit(studentId:string){
    this.childComponentOpend=true;
    this.loginService.setChildComponentRefresh(true)
    this.route.navigate(['StudentDetails/:'+studentId+''],{relativeTo:this.activatedRoute})
  }

}
