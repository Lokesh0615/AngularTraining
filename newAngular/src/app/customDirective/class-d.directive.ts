import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClassD]'
})
export class ClassDDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }
  //  @Input("appClassD") set display(value:Object){
  @Input() set display(value: Object) {
    let entries = Object.entries(value)
    // console.log(entries);
    // for(let entry of entries){
    //   if(entry[1]){
    //     this.renderer.addClass(this.el.nativeElement, entry[0])
    //     console.log("kll");

    //   }
    // }
    for (let [className, condition] of entries) {
      if (condition) {
        this.renderer.addClass(this.el.nativeElement, className)
      }
    }
  }


}
