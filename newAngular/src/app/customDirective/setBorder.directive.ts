import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector:"[setBorder]"
})
export class SetBorderDirective implements OnInit{
    constructor(private el:ElementRef){
        this.el=el;
    }
    ngOnInit(): void {
        this.el.nativeElement.style.border="2px solid red";
    }
    
}