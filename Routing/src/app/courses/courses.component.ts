import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesSerive } from 'src/app/services/courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CoursesSerive]
})
export class CoursesComponent implements OnInit{
  constructor(private route:Router , private activatedRoute:ActivatedRoute, private coursesService:CoursesSerive){}

  localourses:any;
  // localourses=this.coursesService.courses;
  
  ngOnInit(){
    // this.coursesService.getAllCourses().then((data:any)=>{
    //   this.localourses=data;
    // })

    // reslove
    this.localourses= this.activatedRoute.snapshot.data['courses']
  }

  navigateToHome(){
    // navigate and navigateByUrl methods directly takes absolute url, even if u mention (/) or no /
    // this.route.navigate(['Home'])
    this.route.navigateByUrl('Home')

    // some times we need relative path, for that purpose
    this.route.navigate(['Home'],{relativeTo:this.activatedRoute})
  }

}
