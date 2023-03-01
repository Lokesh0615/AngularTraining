import { Directive,ElementRef, Renderer2,HostBinding , HostListener } from "@angular/core";

@Directive({
    selector:"[hostBinding]"
})
export class HostBindingDirective{
    constructor(private el:ElementRef, private rend:Renderer2){

    }

    defaultColor:string='transparent';
    highLiguthColor:string="pink";
    @HostBinding("style.backgroundColor") background:string=this.defaultColor;
    @HostBinding("style.border") border:string="2px solid black";
    @HostListener("click") mose(){
        this.background=this.highLiguthColor;
        // this.background="red"
        console.log("dd");
        
        // this.r
    }
    @HostListener("mouseleave") lkk(){
        this.background=this.defaultColor;
    }
}