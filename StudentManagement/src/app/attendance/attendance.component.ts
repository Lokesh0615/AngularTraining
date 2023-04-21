import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { LoginService } from '../services/login.service';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
 
})

export class AttendanceComponent implements OnInit {

  paginatorDropdown=[{rows:5}, {rows:10}, {rows:15}]
  paginatorValue:number;
  attendanceTableHeader=this.variableService.attendanceTableHeader;
  studentId:string;
  departmentId:string;
  fieldSelected=true;

  loggedInUser!:string;
  dialogShow: boolean = false;
  attendanceData: {}[] = [];
  showAttendanceDetails!: boolean;
  childComponentOpend:boolean;
  studentsData:any=[];

  constructor(private apiService: APIService, private messageService: MessageService, private route: Router,
    private activatedRoute: ActivatedRoute, private variableService: VariableService, private loginService:LoginService,
    private confirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
    let storage=localStorage;
    storage.setItem('path','Attendance')
    storage.setItem('icons',JSON.stringify({'title':'Attendance', 'icon':'pi pi-table'}))
    
    this.childComponentOpend=JSON.parse(storage.getItem('admin')).childComponentOpend;
    this.showAttendanceDetails=false;
    this.loggedInUser=this.loginService.loggedInUser;

    this.getAttendanceDetailes()
    this.showAttendanceDetails = true;
    // i need to check whether studentId And department Id matches or not , so i need student data
    this.apiService.fetchAllStudentsDetails().subscribe((results)=>{
      this.studentsData=results
      
    })

  }
  showDialog(){
    this.studentId='';
    this.departmentId='';
    this.dialogShow=true;
    this.fieldSelected=true;
  }

  getAttendanceDetailes() {
    this.attendanceData=[]
    this.apiService.fetchAllAttendanceDetailes().subscribe((results) => {
      console.log(results);
      for(let result in results){
        let data=this.variableService.getFormatedAttendanceData(results[result])        
        this.attendanceData.push(data);
      }
    }, (error) => {})
  }

  deleteAttendanceRecord(studentId: string, departmentId: string) {
    this.confirmationService.confirm({
      message: 'Are you want to delete the record?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success',  detail: 'Record is deleted successfully' });
        this.apiService.deleteAttendanceByStdIdDeptId(studentId, departmentId).subscribe((results) => { }, (error) => {
          console.log(error);
          this.getAttendanceDetailes()

        })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', detail: 'Record is not Deleted' });
      }
    });
  }

  viewAttendanceDetailes(studentId: string) {
    this.childComponentOpend=true;
    this.loginService.setChildComponentRefresh(true)
    this.route.navigate(['AttendanceDetails/:' + studentId + ''], { relativeTo: this.activatedRoute })

  }

  checkStudentId() {
    let checkData=this.studentsData.some((list)=>{  
      return ( list.departmentId==this.departmentId && list.studentId==this.studentId)
    });
    if (checkData) {
      this.dialogShow = false;
      this.showAttendanceDetails=false
      this.childComponentOpend=true
      this.loginService.setChildComponentRefresh(true)
      this.route.navigate(['AddAttendanceDetails/:'+this.studentId+'/:'+this.departmentId+''], { relativeTo: this.activatedRoute })

    }else{
      this.messageService.add({severity:'error', detail:'Student Id and Department Id dose not exist'});
    }
  }
}
