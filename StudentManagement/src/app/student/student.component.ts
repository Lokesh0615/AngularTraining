import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
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
  studentTableHeaders=this.VariableService.studentTableHeaders;
  studentsData:any=[];
  showStudentDetails!:boolean;
  childComponentOpend:boolean
  loggedInUser!:string;
  studentId:string;
  // studentTableHeaders=this.VariableService.studentTableHeaders;

  // @ViewChild('checkStdId') checkStdId!:ElementRef;
  constructor(private APIService:APIService, private MessageService:MessageService, private route:Router ,
               private activatedRoute:ActivatedRoute, private VariableService:VariableService,
               private ConfirmationService:ConfirmationService, private LoginService:LoginService ){

  }
  
  ngOnInit(): void {
    // console.log("cheke");
    
    localStorage.setItem('icons',JSON.stringify({'title':'Student', 'icon':'pi pi-table'}))
    this.getAllStudentDetailes()
    this.showStudentDetails=false;
    this.childComponentOpend=JSON.parse(localStorage.getItem('admin')).childComponentOpend;
    console.log(this.childComponentOpend);
    
    this.VariableService.title='Student Details'
    this.loggedInUser=this.LoginService.logged_in_user;
    localStorage.setItem('path','Student')
    // localStorage.setItem('admin',JSON.stringify(this.LoginService.admin))

    
  }
  showDialog(){
    this.dialogShow=true;
    // this.checkStdId.nativeElement.value='';
    this.studentId=''
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
    let stdIdExist=this.studentsData.find((list)=> list.studentId==stdId);
    if(!stdIdExist){
      console.log("nextpage");
      this.route.navigate(['AddStudentDetails/:'+stdId+''],{relativeTo:this.activatedRoute})
      this.dialogShow=false;
      // this.checkStdId.nativeElement.value='';
      this.studentId=''
      this.showStudentDetails=false;
      this.VariableService.studentId=stdId
      this.childComponentOpend=true
      this.LoginService.setChildComponentRefresh(true)


    }else{
      this.MessageService.add({severity:'error', detail:'Student Id already Exists'});
    }
  }


  deleteByStdId(stdId:number){
    this.ConfirmationService.confirm({
        message: 'Are you want to delete the record?',
        header: 'Confirmation',
        // icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // console.log("acc");
          
          this.APIService.deleteByStudentId(stdId).subscribe((results)=>{ }, (error)=>{
            console.log(error);
            this.MessageService.add({severity:'success', detail:'Record is deleted successfully'});
            this.getAllStudentDetailes();
          })
        },
        reject: () => {
          // console.log("no");
          
          this.MessageService.add({severity:'error', detail:'Record is not Deleted'});
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

//   onStudentIdSort(event) {


//     console.log(event);
    
//     let comparer = function (a, b) {
//             let result = -1;

//             if (a.studentId.length > b.studentId.length) result = 1;

//             return result * event.order;
//         };
    
//     this.studentsData.sort(comparer);
//     // this.studentsData=this.studentsData.sort(comparer)
//     // console.log(this.studentsData);
    
//   }

  selectedStudenstData1:any=[]
}
