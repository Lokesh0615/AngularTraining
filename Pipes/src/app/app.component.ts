import { Component, OnInit } from '@angular/core';
import { CoursesSerive } from './courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CoursesSerive]
})
export class AppComponent implements OnInit {
  title = 'Pipes';
  date = new Date();
  pi = Math.PI;
  percentage = 0.2345345;
  totalCourse= new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve ( this.localourses.length)
    }, 5000);
  })

  filterType: string = '';
  descriptionLength!: number;

  localourses: {
    id: number, name: string, author: string, duration: string, type: string,
    price: number, ratings: number, image: string,
    description: string
  }[] = [];

  filteredCourse:{
    id: number, name: string, author: string, duration: string, type: string,
    price: number, ratings: number, image: string,
    description: string
  }[] = [];

  constructor(private courseService: CoursesSerive) { }
  ngOnInit(): void {
    this.localourses = this.courseService.courses;
  }



  addCourse() {
    // pure pipe
    //   let newLS=Object.assign([], this.localourses)
    //   newLS.push( {id:103, name:"TEST", author:'jonh', duration:'40',type:'Premium',
    //   price:100, ratings:3.5,image:'assets/React.png',
    //   description:"In this coures you will learn about the fundamentals of React"
    //  }  )
    //  this.localourses=newLS;

    // impure pipe
    this.localourses.push(
      {
        id: 103, name: "TEST", author: 'jonh', duration: '40', type: 'Premium',
        price: 100, ratings: 3.5, image: 'assets/React.png',
        description: "In this coures you will learn about the fundamentals of React"
      })
  }


  changeType() {
    this.localourses[0].type = 'Premium';
  }

  changeDetect() {
    console.log("change detected");

  }

  get filterText() {
    return this.filterType
  }
  set filterText(value:string){
    this.filterType=value;
    this.localourses=this.filterWithoutPipe(value);
  }

  filterWithoutPipe(value: string) {
    if (this.filteredCourse.length === 0 || this.filterType=='') {
      return this.filteredCourse
    } else {
      return this.filteredCourse.filter((filt) => {
        return filt.type===value;
      })
    }
  }
}
