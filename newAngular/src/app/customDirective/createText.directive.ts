import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
@Directive({
    selector:"[createText]"
})
export class CreateTextDirective implements OnInit{
    constructor(private el:ElementRef, private rend:Renderer2){

    }
    ngOnInit(): void {
        // this.rend.createText("hello text")
        
    }
}