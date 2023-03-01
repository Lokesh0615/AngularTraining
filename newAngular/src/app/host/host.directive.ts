import { Directive, ElementRef, Renderer2,HostListener, ContentChild } from "@angular/core";

@Directive({
    selector:'[appHost]'
})
export class HostDirective{
    constructor (private el:ElementRef, private rend:Renderer2){

    }
    @ContentChild("pp") pp!:ElementRef;
   @HostListener("click") onmouseover(){
        this.rend.setStyle(this.el.nativeElement, "backgroundColor", "red");
        this.rend.setStyle(this.el.nativeElement, "margin", "30px");
        this.rend.setStyle(this.el.nativeElement, "padding", "20px");
        this.rend.setStyle(this.el.nativeElement, "transition", "0.5s")
        let a=this.rend.createText("hello HostListener")
        let p=this.rend.createElement("p");
        
        this.rend.appendChild(p, a)
        this.rend.appendChild(this.el.nativeElement, p);
        console.log(this.pp);
        

    }

    @HostListener("mouseleave") abcd(){
        this.rend.setStyle(this.el.nativeElement, "backgroundColor", "green");
        // this.rend.removeStyle(this.el.nativeElement, "backgroundColor")
        // this.rend.setStyle(this.el.nativeElement, "margin", "30px");
        this.rend.removeStyle(this.el.nativeElement, "margin");
        // this.rend.removeStyle(this.el.nativeElement, "padding")
        this.rend.setStyle(this.el.nativeElement, "padding", "20px");
        this.rend.removeStyle(this.el.nativeElement, "transition");
        this.rend.destroy()
        if(this.pp.nativeElement.nextSibling){
            this.rend.removeChild(this.el.nativeElement, this.pp.nativeElement.nextSibling)
            this.rend.destroy()
            // this.rend.destroyNode(this.pp.nativeElement.nextSibling)
            console.log("lo"); 
        }
        
    }
}