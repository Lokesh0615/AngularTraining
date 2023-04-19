import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit, OnDestroy {
  
  DepartmentId !:string;
  departmentData: any={};
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private APIService: APIService, private LoginService:LoginService){}
 

  ngOnInit() {


    //if the parameter value changes then use Obeservables
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.DepartmentId = parm.get('id')?.substring(1);
      this.APIService.findDepartmentByDptId(this.DepartmentId).subscribe((results) => {
      this.departmentData = results;
      localStorage.setItem('path','Department/DepartmentDetailes/:'+this.DepartmentId+'')

    })
    })
    
  }
   
  departmentPage(){
    this.LoginService.setChildComponentRefresh(false)
    this.router.navigateByUrl('/Department');

  }
  ngOnDestroy(): void {
    this.LoginService.setChildComponentRefresh(false)
  }

}
