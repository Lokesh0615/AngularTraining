import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit {
  constructor(private dataService: DataService) { }

  inputText: string = "";
  un!:any;
 
  ngOnInit() {
    this.dataService.dataEmitter.subscribe((val) => this.inputText = val)

  }
  onBtnClick() {

    this.dataService.dE.subscribe(val => console.log("early sub" + val));
    this.dataService.dE.next(["hello comp2"]);
    // async 
    // this.dataService.aSubject.subscribe(val=>console.log("observer 2 " +val))
    // this.dataService.aSubject.next(1)
    // this.dataService.aSubject.complete()

    // replaySubject
    // this.dataService.rSubject.subscribe(val=>console.log('user2 '+val))
    // this.dataService.rSubject.next("loki c2")

    // this.dataService.unSub.subscribe((val)=>console.log(val)
    // this.un=this.dataService.unSub.subscribe((val)=>console.log(val));
    
  }
  unSub(){
    this.un.unsubscribe()

  }
}
