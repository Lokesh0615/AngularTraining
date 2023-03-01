import { Directive, ElementRef, Renderer2,Input } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  constructor(private el:ElementRef, private renderer:Renderer2) { }

  @Input() set high(condition:boolean){
    if(condition){
      this.renderer.addClass(this.el.nativeElement,  "container" )
    }
  }

}
