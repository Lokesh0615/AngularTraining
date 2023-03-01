import { AfterViewInit, ContentChild, Directive, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appRendererListen]'
})
export class RendererListenDirective {

  constructor(private el:ElementRef, private renderer:Renderer2) { 
    // this.renderer.listen(this.el.nativeElement, "click" ,()=>{this.cc++})
    // console.log(this.cc);
  }
  cc:number=0
  @ContentChild('clickListen', { static: false })  clListener!:ElementRef;

  
  @HostListener("click") abd(){
    // this.renderer.listen()
    this.renderer.listen(this.clListener.nativeElement, "click" ,(evt)=>{this.cc++
      // console.log(this.cc);
    })
    
  }
   
}
