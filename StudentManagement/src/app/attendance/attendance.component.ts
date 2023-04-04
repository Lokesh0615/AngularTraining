import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  dialogShow:boolean=false;
  attendanceData:{}[]=[];
  showAttendanceDetails!:boolean;
  constructor(private APIService:APIService, private MessageService:MessageService, private route:Router , private activatedRoute:ActivatedRoute, private VariableService:VariableService, private ConfirmationService:ConfirmationService ){}

  ngOnInit(): void {
   this.getAttendanceDetailes()
   this.showAttendanceDetails=true;

  }

  getAttendanceDetailes(){
    this.APIService.getAllAttendanceDetailes().subscribe((results)=>{
      console.log("results");
      
      this.attendanceData=Object.values(results)
    }, (error)=>{console.log("error");
      this.attendanceData=Object.values(error)
    })
  }

  deleteAttendanceRecord(studentId:string, departmentId:string) {
        this.ConfirmationService.confirm({
            message: 'Are you want to delete the record?',
            header: 'Confirmation',
            // icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.MessageService.add({severity:'success', summary:'Confirmed', detail:'Record is deleted successfully'});
                this.APIService.deleteAttendanceByStdIdDeptId(studentId, departmentId).subscribe((results)=>{},(error)=>{
                  console.log(error);
                  this.getAttendanceDetailes()
                })
            },
            reject: () => {
              this.MessageService.add({severity:'error', summary:'Rejected', detail:'Record is not Deleted'});
            }
        });
    }
 
    attendanceDetailesEdit(studentId:string){
      this.route.navigate(['AttendanceDetails/:'+studentId+''],{relativeTo:this.activatedRoute})
      this.showAttendanceDetails=false;

      // this.showStudentDetails=false;
    }
  findAttendanceByStudentIdDepartmentId(){}
}
