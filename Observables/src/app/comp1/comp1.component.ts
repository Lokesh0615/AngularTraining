import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component {
constructor(private dataService:DataService){}

  enteredText!:string;
  onBtnClick(){
    // console.log(this.enteredText);
    this.dataService.raiseDataEmmotterEvent(this.enteredText);
    // this.dataService.dE
    this.dataService.dE.subscribe(val => console.log("early sub" + val));
    this.dataService.dE.next(["hello comp1"]);

    // this.dataService.aSubject.subscribe(val=>console.log("observer 1 " +val))
    // this.dataService.aSubject.next(1)

    // replay subject
    // this.dataService.rSubject.subscribe(val=>console.log('user1 '+val))
    //     this.dataService.rSubject.next("loki c1")
  }
}
