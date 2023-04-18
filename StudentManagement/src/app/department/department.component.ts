import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { LoginService } from '../services/login.service';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit, OnDestroy{

  paginatorDropdown=[{rows:5}, {rows:10}, {rows:15}]
  paginatorValue:number;

  departmentHeader=this.VariableService.departmentHeader;
  departmentsData:any=[];
  departmentDataLength!:number;
  showDepartmentDetails!:boolean;
  childComponentOpend!:boolean;

  constructor(private APIService:APIService, private route:Router , private MessageService:MessageService, private activatedRoute:ActivatedRoute, private LoginService:LoginService, private VariableService:VariableService){}

  ngOnDestroy(): void {
    // this.VariableService.changeTitle("Department Details")
    // this.VariableService.titleChange.next("Department Details")
  }

  ngOnInit(): void {

    localStorage.setItem('path','Department')
    // let icons=JSON.plocalStorage.getItem('icon'));
    // localStorage.setItem('admin',JSON.stringify(this.LoginService.admin))
    localStorage.setItem('icons',JSON.stringify({'title':'Department', 'icon':'pi pi-table'}))
    console.log("parent open");
    this.showDepartmentDetails=false;
    console.log(this.LoginService.userData.childComponentOpend);
    this.childComponentOpend=JSON.parse(localStorage.getItem('admin')).childComponentOpend;
    console.log(this.showDepartmentDetails);
    console.log(this.childComponentOpend);
    // this.VariableService.title='Departmnet Details'

    // this.MessageService.add({severity:'error', summary:'error Message', detail:'Student Id already Exists'});

    this.getAllDepartments()
  
   
    
  }
  getAllDepartments(){
    this.APIService.getAllDepartmnetDetailes().subscribe((results)=>{
      this.departmentsData=results
      this.departmentDataLength=this.departmentsData.length;
    })
  }

  departmentDetailes(departmenId:string){
    this.childComponentOpend=true;
    this.LoginService.setChildComponentRefresh(true)
    console.log(this.LoginService.userData.childComponentOpend);    // let admin={user_id:'admin', password:'admin',logged_in:true, childComponentOpend:true}
    //           localStorage.setItem('admin',JSON.stringify(admin))
    this.route.navigate(['DepartmentDetailes/:'+departmenId+''],{relativeTo:this.activatedRoute})
    
  }
}
