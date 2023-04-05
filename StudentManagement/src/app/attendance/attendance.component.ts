import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { StudentDetailesService } from '../services/studentDetailes';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
 
})
export class AttendanceComponent implements OnInit {

  dialogShow: boolean = false;
  attendanceData: {}[] = [];
  showAttendanceDetails!: boolean;
  studentsData:StudentDetailesService[]=[];

  @ViewChild('checkStdId') checkStdId!: ElementRef;
  @ViewChild('checkDeptId') checkDeptId!: ElementRef;
  constructor(private APIService: APIService, private MessageService: MessageService, private route: Router,
    private activatedRoute: ActivatedRoute, private VariableService: VariableService,
    private ConfirmationService: ConfirmationService, private StudentDetailesService: StudentDetailesService,
    ) { }

  ngOnInit(): void {
    this.getAttendanceDetailes()
    this.showAttendanceDetails = true;
    this.APIService.findAllStudents().subscribe((results)=>{
      for(let result of Object.values(results)){
        console.log(result);
        // this.studentsData=results;
        let data=this.VariableService.getFormatedStudentData(result)
        this.studentsData.push(data)
        // console.log(data);
        
      }
    })

  }
  showDialog() {
    this.dialogShow = true;
    this.checkStdId.nativeElement.value = '';
    this.checkDeptId.nativeElement.value = '';

  }

  getAttendanceDetailes() {
    this.APIService.getAllAttendanceDetailes().subscribe((results) => {
      console.log(results);

      this.attendanceData = Object.values(results)
    }, (error) => {
      console.log("error");
      // this.attendanceData=Object.values(error)
    })
  }

  deleteAttendanceRecord(studentId: string, departmentId: string) {
    this.ConfirmationService.confirm({
      message: 'Are you want to delete the record?',
      header: 'Confirmation',
      // icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.MessageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record is deleted successfully' });
        this.APIService.deleteAttendanceByStdIdDeptId(studentId, departmentId).subscribe((results) => { }, (error) => {
          console.log(error);
          this.getAttendanceDetailes()
        })
      },
      reject: () => {
        this.MessageService.add({ severity: 'error', summary: 'Rejected', detail: 'Record is not Deleted' });
      }
    });
  }

  attendanceDetailesEdit(studentId: string) {
    this.route.navigate(['AttendanceDetails/:' + studentId + ''], { relativeTo: this.activatedRoute })
    this.showAttendanceDetails = false;

    // this.showStudentDetails=false;
  }
  findAttendanceByStudentIdDepartmentId() { }

  checkStudentId(studentId: string, departmentId: string) {
    // this.dialogShow = false
    // let studentcheckFunction = this.StudentComponent;
    let checkData=this.studentsData.some((list)=>{  
      let departmentIdCheck:any=list.departmentId;
      return ( departmentIdCheck==departmentId && list.studentId==Number(studentId))
    });
    // console.log(checkData);
    if (checkData) {
      this.dialogShow = false;
      this.showAttendanceDetails=false
      this.VariableService.attendanceStudentId=studentId;
      this.VariableService.attendenceDepartmentId=departmentId;
      console.log("nextpage");
      this.route.navigate(["AttendanceDetails"], { relativeTo: this.activatedRoute })
      this.checkStdId.nativeElement.value = '';
      this.checkDeptId.nativeElement.value = '';


    }else{
      // this.dialogShow = false;
      console.log("elsepart");
      
      this.MessageService.add({severity:'error', summary:'error Message', detail:'Student Id and Department Id dose not exist'});
    }
    // this.dialogShow=true;
    // if(){

    // }
    // this.route.navigateByUrl()


    // this.showAttendanceDetails = false;

  }
}
