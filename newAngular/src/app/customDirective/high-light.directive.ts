import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective implements OnInit {

  constructor ( private element:ElementRef, private renderer:Renderer2) {

   }
   ngOnInit(): void {
     this.renderer.setStyle(this.element.nativeElement, "backgroundColor","yellow" )
     this.renderer.addClass(this.element.nativeElement, "containerrrr")
    //  this.renderer.createText("kdidji")
  

   }
}
