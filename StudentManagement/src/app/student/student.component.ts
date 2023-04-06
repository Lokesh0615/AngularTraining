import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { StudentDetailesService } from '../services/studentDetailes';
import { ActivatedRoute, Router } from '@angular/router';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],

})
export class StudentComponent implements OnInit {
  title="StudentTable"
  dialogShow:boolean=false;
  studentsData:StudentDetailesService[]=[];
  studentsDataLength!:number;
  showStudentDetails!:boolean;
  studentTableHeaders=this.VariableService.studentTableHeaders;
  @ViewChild('checkStdId') checkStdId!:ElementRef;
  constructor(private APIService:APIService, private MessageService:MessageService, private route:Router ,
               private activatedRoute:ActivatedRoute, private VariableService:VariableService,
               private ConfirmationService:ConfirmationService ){

  }
  
  ngOnInit(): void {
    this.getAllStudentDetailes()
    this.showStudentDetails=true;
    
  }
  showDialog(){
    this.dialogShow=true;
    this.checkStdId.nativeElement.value='';
  }
  getAllStudentDetailes(){
    this.studentsData=[]
    console.log(this.studentsData);
    
    this.APIService.findAllStudents().subscribe((results)=>{
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
      this.route.navigate(['AddStudentDetails'],{relativeTo:this.activatedRoute})
      this.dialogShow=false;
      this.checkStdId.nativeElement.value='';
      this.showStudentDetails=false;
      this.VariableService.studentId=stdId
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
    this.showStudentDetails=false;
  }

  selectedStudenstData1:any=[]
}
