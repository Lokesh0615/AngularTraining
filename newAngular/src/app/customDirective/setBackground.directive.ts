import { Directive, ElementRef, OnInit } from "@angular/core"

@Directive({
    selector:"[setBackground]",

})

export class SetBackgroundDirective implements OnInit{
    // private el:ElementRef;
    constructor(private el:ElementRef){
        // element.nativeElement.style.backgroundColor="green";
        this.el=el;
    }

    ngOnInit(){
        this.el.nativeElement.style.backgroundColor="green";
    }
}