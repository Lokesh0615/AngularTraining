import { Component, OnInit } from '@angular/core';
import { from, Observable, of, map, filter } from 'rxjs';

@Component({
  selector: 'app-create-observable',
  templateUrl: './create-observable.component.html',
  styleUrls: ['./create-observable.component.css']
})
export class CreateObservableComponent implements OnInit {
  title="AngularObservables";
// creating method with constructor
  // myObservable=new Observable((observere)=>{
  //   console.log("observalbe starts");

  //   // setTimeout(() => {observere.next("Stinll proccessing...") }, 3000);
  //   // // setTimeout(() => {observere.error("issue!")}, 5000);
  //   // setTimeout(() => {observere.complete()}, 6000);

  //   setTimeout(()=>{observere.next(1)},1000)
  //   setTimeout(()=>{observere.next(2)},2000)
  //   setTimeout(()=>{observere.next(3)},3000)
  //   // setTimeout(()=>{observere.error(new Error("somthing error"))},3000)
  //   setTimeout(()=>{observere.next(4)},4000)
  //   setTimeout(()=>{observere.next(5)},5000)
  //   setTimeout(()=>{observere.complete()},6000)


  //   // observere.next(1)
  //   // observere.next(2)
  //   // observere.next(3)
  //   // observere.next(4)
  //   // observere.next(5)

    
  // });
  // ngOnInit(){
  //   this.myObservable.subscribe(
  //     (data)=>console.log(data),
  //     (error) => {alert(error.message) },
  //     ()=> {
  //       alert("Observable has completed emitting all values")
  //       console.log("procees completed")}
  //   );
  //   console.log('component initialized');
    
  // }
// onother way to create method a Observables
// myObservable=Observable.create((observer:any)=>{
//   observer.next("processing..")
//   setTimeout(()=>{observer.next(1)},1000)
//   setTimeout(()=>{observer.next(2)},1000)
//   setTimeout(()=>{observer.error(3)},1000)
//   setTimeout(()=>{observer.next(4)},1000)

// });

//   ngOnInit(){
//     this.myObservable.subscribe(
//       (data:any)=>console.log(data),
//       (error:any)=>{alert(error) 
//       console.log(error)},
//       ()=>console.log("completed")
//     )
//   }

  array1=[1,2,3,4,5];
  array2=['a','b','c','d','e']
  // by using of method
  // myObesrvables=of(this.array1, this.array2);

  // by using from method
  // myObesrvables=from(this.array1);
  
  // transforemedObs=this.myObesrvables.pipe(map((val)=>val*2))
  // filterObs=this.transforemedObs.pipe(filter((val)=>val>5))
  // transforemedObs=this.myObesrvables.pipe(map((val)=>val*2),filter((val)=>5<val))
  
  myObesrvables=from(this.array1).pipe(map((val)=>val*5), filter((val)=>val>10));

  ngOnInit(){
    this.myObesrvables.subscribe((val)=>{console.log(val)},
      (error:any)=>{console.log(error)},
      ()=>alert("completed"))
  }
}
