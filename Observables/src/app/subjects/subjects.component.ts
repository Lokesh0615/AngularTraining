import { Component } from '@angular/core';
import { Injectable, EventEmitter, OnInit } from '@angular/core'
import { BehaviorSubject, Subject, AsyncSubject, ReplaySubject } from 'rxjs'

@Injectable()
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {


  dataEmitter = new Subject<string>()

  // behavioralSubject
  dE=new BehaviorSubject(0);
  // series=this.dE.asObservable();
  // this.dE.

  // ngOnInit(){
  //     this.dE.subscribe(val => console.log("early sub" +val));
  //     this.dE.next(1);
  //     this.dE.next(2);
  //     this.dE.next(3);
  //     setTimeout(() => {
  //         this.dE.subscribe(val=>console.log("late sub" +val))
  //         this.dE.next(4)
  //         this.dE.next(5)
  //         // this.dE.next(6)
  //     }, 2000);
  //     setTimeout(() => {
  //       this.dE.subscribe(val=>console.log("late sub2" +val))
  //       this.dE.next(6)
  //       this.dE.next(7)
  //       // this.dE.next(6)
  //   }, 5000);
  // }

  // async subject
  //  aSubject=new AsyncSubject();
  //  ngOnInit(){
  //   this.aSubject.subscribe(val=>console.log("observer 1 " +val))
  //   this.aSubject.next(1)
  //   this.aSubject.next(2)
  //   this.aSubject.next(3)
  //   this.aSubject.complete()
  //   setTimeout(() => {
  //     this.aSubject.subscribe(val=>console.log("observer 2 "+val))
  //     // previously subject got closed, so we can not use again next methods, it wont work
  //     this.aSubject.next(4)
  //     this.aSubject.next(5)
  //     this.aSubject.complete()
  //   }, 2000);
  //   setTimeout(() => {
  //     this.aSubject.subscribe(val=>console.log("observer 3 "+val))
  //     this.aSubject.next(4)
  //     this.aSubject.next(5)
  //     this.aSubject.complete()
  //   }, 4000);
  //  }

  //  replay Subject 
  rSubject=new ReplaySubject(2, 5000);
  ngOnInit(){
    this.rSubject.next(1)
    this.rSubject.next(2)
    this.rSubject.subscribe(val=>console.log('user1 '+val))
    this.rSubject.next(3)
    setTimeout(() => {
      this.rSubject.subscribe(val=>console.log('user2 '+val))
     
      this.rSubject.next(4)
    }, 2000);
    setTimeout(() => {
      this.rSubject.subscribe(val=>console.log('user3 '+val))
      // this.rSubject.next(5)
      // this.rSubject.next(6)
    }, 6000);
  }
 
}
