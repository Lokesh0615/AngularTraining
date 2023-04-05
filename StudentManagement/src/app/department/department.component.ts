import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { APIService } from '../services/APIservice.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit{

  departmentsData:{}[]=[];
  showDepartmentDetails!:boolean;
  childComponentOpend!:boolean;;
  constructor(private APIService:APIService, private route:Router , private MessageService:MessageService, private activatedRoute:ActivatedRoute, private LoginService:LoginService){}

  ngOnInit(): void {
    console.log("parent open");
    this.showDepartmentDetails=false;
    console.log(this.LoginService.userData.childComponentOpend);
    this.childComponentOpend=this.LoginService.userData.childComponentOpend;
    console.log(this.showDepartmentDetails);
    console.log(this.childComponentOpend);
    
    this.MessageService.add({severity:'error', summary:'error Message', detail:'Student Id already Exists'});

    this.getAllDepartment()
  
   
    
  }
  getAllDepartment(){
    this.APIService.getAllDepartmnet().subscribe((results)=>{
      this.departmentsData=Object.values(results)
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
