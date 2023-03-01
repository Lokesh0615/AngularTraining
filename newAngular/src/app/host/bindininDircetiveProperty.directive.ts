import { Directive, HostBinding, Input, OnChanges } from "@angular/core";

@Directive({
    selector:"[bindingDirective]"
})
export class BindingDircetive implements OnChanges{
    constructor(){
        // console.log("loo");
        
    }
    @Input () bgc!:string;
    @HostBinding("style.backgroundColor") abc!:string;

    ngOnChanges(){
        this.abc=this.bgc
    }
}