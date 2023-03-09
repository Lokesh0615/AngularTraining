import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CoursesSerive } from "./courses.service";

@Injectable()
export class CourseResolveService implements Resolve<any>{
    constructor(private coursesService:CoursesSerive){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return    this.coursesService.getAllCourses().then((data:any)=>{
            return data;
        })
    }
}

