import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CoursesSerive } from 'src/app/services/courses.service';
// import { Form }

@Component({
  selector: 'app-coures',
  templateUrl: './coures.component.html',
  styleUrls: ['./coures.component.css'],
  providers: [CoursesSerive]
})
export class CouresComponent implements OnInit, OnDestroy {

course!:any;
courseId!:any;
routeParaObs!:any;
editMode:boolean=false;
constructor(private activatedRoute:ActivatedRoute, private service:CoursesSerive, private router:Router){}
ngOnInit(){

  // if the parameter value dont change then use snapshot
  // this.courseId=this.activatedRoute.snapshot.params['id']
  // this.course=this.service.courses.find(x=>x.id==this.courseId);
  // console.log(this.courseId);
  // console.log(this.course);

  //if the parameter value changes then use Obeservables
  this.routeParaObs=this.activatedRoute.paramMap.subscribe((parm)=>{
    this.courseId=parm.get('id');
    this.course=this.service.courses.find((x)=>x.id==this.courseId)
  })

  // this.activatedRoute.snapshot.queryParamMap.get('edit');
 
  
}
ngOnDestroy(){
  this.routeParaObs.unsubscribe()
}

queryPara(){
  this.router.navigate(['/Courses/Coures', this.courseId], {queryParams:{edit:true}})

  this.activatedRoute.queryParamMap.subscribe((p)=>{
    this.editMode=Boolean(p.get('edit'));
    
  })
}
}
