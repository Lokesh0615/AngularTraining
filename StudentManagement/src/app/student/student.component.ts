import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { StudentDetailesService } from '../services/studentDetailes';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  dialogShow:boolean=false;
  products:StudentDetailesService[]=[];
  @ViewChild('checkStdId') checkStdId!:ElementRef;
  constructor(private APIService:APIService, private MessageService:MessageService){

  }
  ngOnInit(): void {
     this.APIService.findAllStudents().subscribe((results)=>{
      this.products=Object.values(results);
      // console.log(this.products);
    })
  }
  showDialog(){
    this.dialogShow=true;
    this.checkStdId.nativeElement.value='';
  }

  checkStudentId(stdId:string){
    let stdIdExist=this.products.find((list)=> list.studentId===stdId);
    if(!stdIdExist){
      console.log("nextpage");
      this.dialogShow=false;
      this.checkStdId.nativeElement.value='';
    }else{
      this.MessageService.add({severity:'error', summary:'error Message', detail:'Student Id already Exists'});
    }
  }
  selectedProducts1:any=[]
}
