import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/APIservice.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit{

  departmentsData:{}[]=[];
  showDepartmentDetails:boolean=true;
  childComponentOpend=false;
  constructor(private APIService:APIService, private route:Router , private activatedRoute:ActivatedRoute, private LoginService:LoginService){}

  ngOnInit(): void {
    this.APIService.getAllDepartmnet().subscribe((results)=>{
      this.departmentsData=Object.values(results)
    })
    this.showDepartmentDetails=false;
    this.childComponentOpend=this.LoginService.userData.childComponentOpend;

  }

  departmentDetailes(departmenId:string){
    this.childComponentOpend=true;
    this.LoginService.setChildComponentRefresh(true)
    // let admin={user_id:'admin', password:'admin',logged_in:true, childComponentOpend:true}
    //           localStorage.setItem('admin',JSON.stringify(admin))
    this.route.navigate(['DepartmentDetailes/:'+departmenId+''],{relativeTo:this.activatedRoute})
    
  }
}
