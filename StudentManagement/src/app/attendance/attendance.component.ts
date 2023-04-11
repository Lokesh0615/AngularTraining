import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { LoginService } from '../services/login.service';
import { StudentDetailesService } from '../services/studentDetailes';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
 
})
export class AttendanceComponent implements OnInit {

  paginatorDropdown=[{rows:5}, {rows:10}, {rows:15}]
  paginatorValue:number;
  attendanceTableHeader=this.VariableService.attendanceTableHeader;

  loggedInUser!:string;
  dialogShow: boolean = false;
  attendanceData: {}[] = [];
  attendanceDataLength!:number;
  showAttendanceDetails!: boolean;
  childComponentOpend:boolean;
  studentsData:any=[];

  @ViewChild('checkStdId') checkStdId!: ElementRef;
  @ViewChild('checkDeptId') checkDeptId!: ElementRef;
  constructor(private APIService: APIService, private MessageService: MessageService, private route: Router,
    private activatedRoute: ActivatedRoute, private VariableService: VariableService, private LoginService:LoginService,
    private ConfirmationService: ConfirmationService, private StudentDetailesService: StudentDetailesService,
    ) { }

  ngOnInit(): void {

    localStorage.setItem('path','Attendance')
    localStorage.setItem('icons',JSON.stringify({'title':'Attendance', 'icon':'pi pi-table'}))
    this.childComponentOpend=this.LoginService.userData.childComponentOpend;
    this.showAttendanceDetails=false;
    this.loggedInUser=this.LoginService.logged_in_user;

    // this.studentsData=[]
    console.log("table");
    this.VariableService.title='Attendance Details'

    this.getAttendanceDetailes()
    this.showAttendanceDetails = true;
    // i need to check whether studentId And department Id matches or not , so i need student data
    this.APIService.findAllStudents().subscribe((results)=>{
      this.studentsData=results
      
    })

  }
  showDialog() {
    this.dialogShow = true;
    // this.checkStdId.nativeElement.value = '';
    // this.checkDeptId.nativeElement.value = '';

  }

  getAttendanceDetailes() {
    // this.studentsData=[]
    this.attendanceData=[]
    this.APIService.getAllAttendanceDetailes().subscribe((results) => {
      console.log(results);
      for(let result of Object.values(results)){
        let data=this.VariableService.getFormatedAttendanceData(result)
        console.log(result);
        
        this.attendanceData.push(data);
      }
      // this.attendanceData = Object.values(results)
      // if(this.attendanceData.length==0){
      //   this.attendanceData.push({na:"loesh"});
      //   console.log("0000");
        
      // }
      this.attendanceDataLength=this.attendanceData.length;

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
    // this.showAttendanceDetails = false;
    this.childComponentOpend=true;
    this.LoginService.setChildComponentRefresh(true)
    
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
      this.route.navigate(['AddAttendanceDetails/:'+studentId+'/:'+departmentId+''], { relativeTo: this.activatedRoute })
      // this.checkStdId.nativeElement.value = '';
      // this.checkDeptId.nativeElement.value = '';
      this.childComponentOpend=true
      // this.childComponentOpend=true;
    this.LoginService.setChildComponentRefresh(true)

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
