import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { StudentDetailesService } from '../services/studentDetailes';
import { ActivatedRoute, Router } from '@angular/router';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  title="StudentTable"
  dialogShow:boolean=false;
  studentsData:StudentDetailesService[]=[];
  studentsDataLength!:number;
  showStudentDetails!:boolean;
  @ViewChild('checkStdId') checkStdId!:ElementRef;
  constructor(private APIService:APIService, private MessageService:MessageService, private route:Router , private activatedRoute:ActivatedRoute, private VariableService:VariableService ){

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
    this.APIService.findAllStudents().subscribe((results)=>{
      this.studentsData=Object.values(results);
      console.log(results);
    })
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

  deleteByStdId(stdId:string){
    this.APIService.deleteByStudentId(stdId).subscribe((results)=>{ }, (error)=>{
      console.log(error);
      this.getAllStudentDetailes();
    })
  }
  studentDetailesEdit(studentId:string){
    this.route.navigate(['StudentDetails/:'+studentId+''],{relativeTo:this.activatedRoute})
    this.showStudentDetails=false;
  }

  selectedStudenstData1:any=[]
}
