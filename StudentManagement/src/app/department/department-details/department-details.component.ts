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
  
  showStudentDetailes = true;
  DepartmentId !:string;
  departmentData: any={};
  constructor(private activatedRoute: ActivatedRoute, private router: Router,private APIService: APIService, private LoginService:LoginService){}
 

  ngOnInit() {
    //if the parameter value changes then use Obeservables
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.DepartmentId = String(parm.get('id')?.substring(1));
      this.APIService.findDepartmentByDptId(this.DepartmentId).subscribe((results) => {
      console.log(results);
      this.departmentData = results;
    })
    })
    
  }
   
  departmentPage(){
    this.router.navigateByUrl('/Department');
    this.LoginService.setChildComponentRefresh(false)

  }
  ngOnDestroy(): void {
    // this.router.navigateByUrl('/Department');
    this.LoginService.setChildComponentRefresh(false)

    // let admin={user_id:'admin', password:'admin',logged_in:true, childComponentOpend:false}
    //           localStorage.setItem('admin',JSON.stringify(admin))
  }

}
