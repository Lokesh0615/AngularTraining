import { AfterViewInit, Component, ElementRef,Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-renderer2',
  templateUrl: './renderer2.component.html',
  styleUrls: ['./renderer2.component.css']
})
export class Renderer2Component implements AfterViewInit {
  co=0;
  @ViewChild("parentEl", {static:true}) ch!:ElementRef;
  clicklistener:any;
  constructor(private el:ElementRef,private rend:Renderer2){

  }
  
  ngAfterViewInit(){
    this.clicklistener=this.rend.listen(this.ch.nativeElement, 'click', (evt)=>{this.co++})
}
}
