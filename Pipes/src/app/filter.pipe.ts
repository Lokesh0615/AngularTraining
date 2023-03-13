import { Pipe, PipeTransform } from '@angular/core';
import { CoursesSerive } from './courses.service';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value:any, filterType:string, propName:string): any {
    console.log("filter pipe is called");
    
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
