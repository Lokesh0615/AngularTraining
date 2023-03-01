import { AfterViewInit, Directive, ElementRef, OnInit, Renderer2,ViewChild } from "@angular/core";

@Directive({
    selector:"[appRenderer2]"

})
export class Rednderer2Directive implements OnInit{

    constructor(private el:ElementRef,private rend:Renderer2){
        this.el=el;
        
    }
    count=0;
    

    @ViewChild("parentEl", {static:false}) parentEl:any;
     ngOnInit(): void {
        // elem=this.el.na
        //  this.rend.addClass(this.el.nativeElement, "conatiner")
        //  this.rend.setAttribute(this.el.nativeElement, "id" ,"container1")
        //  this.rend.selectRootElement(this.el);
        // //  this.rend.appendChild(this.el, )
        // this.rend.setProperty(this.el.nativeElement, "width", "50px")
        // this.rend.setProperty(this.el.nativeElement, "innerHTML", "helo")
        this.rend.setAttribute(this.el.nativeElement,"id" , "okID")
        this.rend.setStyle(this.el.nativeElement, "color", "red")
        this.rend.removeStyle(this.el.nativeElement, "color")
        this.rend.addClass(this.el.nativeElement, "container");
        this.rend.removeClass(this.el.nativeElement ,"container");
        let text=this.rend.createText("examplecreate text")
        let p=this.rend.createElement("p");
        this.rend.appendChild(p, text);
        this.rend.appendChild(this.el.nativeElement, p)
        // this.rend
        let div=this.rend.createElement('div');
        let te=this.rend.createText("insertbefore");
        this.rend.appendChild(div,te);
        this.rend.insertBefore(this.el.nativeElement, div,this.parentEl)
        // this.rend.insertBefore(this.parentEl, div, this.parentEl)
        // console.log(this.el);
        // console.log(this.parentEl);
        // this.fa();
        let com=this.rend.createComment("its a createcomment")
        this.rend.appendChild(div, com);
        console.log(this.rend.parentNode(this.el.nativeElement));
        console.log(this.rend.nextSibling(this.el.nativeElement));
        console.log(this.rend.selectRootElement(this.el.nativeElement, true));
        
        
     }
   
            

    
}