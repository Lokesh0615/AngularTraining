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
  attendanceTableHeader=this.VariableService.attendanceTableHeader;
  studentId:string;
  departmentId:string;
  fieldSelected=true;

  loggedInUser!:string;
  dialogShow: boolean = false;
  attendanceData: {}[] = [];
  showAttendanceDetails!: boolean;
  childComponentOpend:boolean;
  studentsData:any=[];

  constructor(private APIService: APIService, private MessageService: MessageService, private route: Router,
    private activatedRoute: ActivatedRoute, private VariableService: VariableService, private LoginService:LoginService,
    private ConfirmationService: ConfirmationService,
    ) { }

  ngOnInit(): void {
    let storage=localStorage;
    storage.setItem('path','Attendance')
    storage.setItem('icons',JSON.stringify({'title':'Attendance', 'icon':'pi pi-table'}))
    
    this.childComponentOpend=JSON.parse(storage.getItem('admin')).childComponentOpend;
    this.showAttendanceDetails=false;
    this.loggedInUser=this.LoginService.logged_in_user;

    this.getAttendanceDetailes()
    this.showAttendanceDetails = true;
    // i need to check whether studentId And department Id matches or not , so i need student data
    this.APIService.findAllStudents().subscribe((results)=>{
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
    this.APIService.getAllAttendanceDetailes().subscribe((results) => {
      console.log(results);
      for(let result in results){
        let data=this.VariableService.getFormatedAttendanceData(results[result])        
        this.attendanceData.push(data);
      }
    }, (error) => {})
  }

  deleteAttendanceRecord(studentId: string, departmentId: string) {
    this.ConfirmationService.confirm({
      message: 'Are you want to delete the record?',
      header: 'Confirmation',
      accept: () => {
        this.MessageService.add({ severity: 'success',  detail: 'Record is deleted successfully' });
        this.APIService.deleteAttendanceByStdIdDeptId(studentId, departmentId).subscribe((results) => { }, (error) => {
          console.log(error);
          this.getAttendanceDetailes()

        })
      },
      reject: () => {
        this.MessageService.add({ severity: 'error', detail: 'Record is not Deleted' });
      }
    });
  }

  viewAttendanceDetailes(studentId: string) {
    this.childComponentOpend=true;
    this.LoginService.setChildComponentRefresh(true)
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
      this.LoginService.setChildComponentRefresh(true)
      this.route.navigate(['AddAttendanceDetails/:'+this.studentId+'/:'+this.departmentId+''], { relativeTo: this.activatedRoute })

    }else{
      this.MessageService.add({severity:'error', detail:'Student Id and Department Id dose not exist'});
    }
  }
}
