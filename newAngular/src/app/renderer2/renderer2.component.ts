import { AfterViewInit, Component, ElementRef,Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-renderer2',
  templateUrl: './renderer2.component.html',
  styleUrls: ['./renderer2.component.css']
})
export class Renderer2Component  {
  co=0;
  @ViewChild("parentEl", {static:true}) ch!:ElementRef;
  clicklistener:any;
  constructor(private el:ElementRef,private rend:Renderer2){

  }
  
  abcd(){
    this.clicklistener=this.rend.listen(this.ch.nativeElement, 'click', ()=>{this.co++ 
      this.adddd()})
}
adddd(){
  let a=this.rend.createElement("p");
  let b=this.rend.createText(`hello ${this.co}`);
  this.rend.appendChild(a,b);
  this.rend.appendChild(this.el.nativeElement, a);
}
}
