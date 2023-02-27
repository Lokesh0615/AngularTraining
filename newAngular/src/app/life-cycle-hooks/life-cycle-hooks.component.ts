import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-life-cycle-hooks',
  templateUrl: './life-cycle-hooks.component.html',
  styleUrls: ['./life-cycle-hooks.component.css']
})
export class LifeCycleHooksComponent implements OnInit,OnChanges, OnDestroy, AfterContentInit,
AfterContentChecked, AfterViewInit,AfterViewChecked, DoCheck{

 @Input() value:string="prodacemy"

  constructor(){
    console.log("constructor");
    // console.log(this.value);
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change');
    // console.log(changes);
    
    // console.log(this.value);
    
  }
  ngOnInit(): void {
    console.log("on init");
    // console.log(this.value);
    
    
  }
  ngDoCheck(): void {
    console.log("doCheck");
    
  }
  ngOnDestroy(): void {
    console.log('onDestroy');
    
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInint');
    
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewCheched');
    
  }
  
  ngAfterContentInit(): void {
    console.log('ngAftercontentInit');
    
  }
  ngAfterContentChecked(): void {
    console.log('ng afterContent checked');
    
  }
  

 

}
