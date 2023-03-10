import { Pipe, PipeTransform } from '@angular/core';
import { CoursesSerive } from './courses.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any, filterType:string, propName:string): any {
    if(value.length===0|| filterType===''){
      return value
    }
    const resultArray=[]
    for(const course of value){
      
      if(course[propName]=== filterType){
        resultArray.push(course)
      }
      
    }
    return resultArray
  }

}
