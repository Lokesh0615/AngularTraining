import { Component, ElementRef, ViewChild } from '@angular/core';
import { AgeComponent } from "./age/age.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular1stProject';
  message="Angular is the best JS framework"
  ename="lokesh";

  // title="ViewChild";
  @ViewChild('dobInput') dateOfBirth:ElementRef;
  @ViewChild('ageInput') age:any;
  @ViewChild(AgeComponent, {static: true}) ageComp:any;

  calAge(){
    // console.log("nfjdbh");
    
    let birthYear=new Date(this.dateOfBirth.nativeElement.value).getFullYear();
    let cYear=new Date().getFullYear();
    // console.log(birthYear);
    // console.log(cYear);
    
    this.age.nativeElement.value=(cYear-birthYear);
    
    // console.log(this.dateOfBirth);
    // console.log(this.age);
    
    
  }
  // output
  gt(data:string){
    alert(data)
    
  }

}
