import { Directive,ElementRef, Renderer2,HostBinding , HostListener, Input, OnInit } from "@angular/core";

@Directive({
    selector:"[hostBinding]"
})
export class HostBindingDirective implements OnInit{
    constructor(private el:ElementRef, private rend:Renderer2){

    }

    @Input() defaultColor:string='transparent';
    @Input() highLiguthColor:string="pink";


    @HostBinding("style.backgroundColor") background:string=this.defaultColor;
    @HostBinding("style.border") border:string="2px solid black";

    ngOnInit(){
        this.background=this.defaultColor;
    }
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