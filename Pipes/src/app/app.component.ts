import { Component, OnInit } from '@angular/core';
import { CoursesSerive } from './courses.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[CoursesSerive]
})
export class AppComponent implements OnInit {
  title = 'Pipes';
  date=new Date();
  pi=Math.PI;
  percentage=0.2345345;

  filterType:string='';


  localourses:{id:number, name:string, author:string, duration:string,type:string,
  price:number, ratings:number,image:string,
  description:string}[]=[];

  constructor(private courseService:CoursesSerive){}
  ngOnInit(): void {
    this.localourses=this.courseService.courses;
  }

}
