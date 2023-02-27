import { Directive, ElementRef, OnInit} from '@angular/core'

@Directive({
    selector:"[setBorderRadius]"
})

export class setBorderRadiusDirective implements OnInit{
    constructor(private el: ElementRef){
        this.el=el;
    }
    ngOnInit(): void {
        this.el.nativeElement.style.borderRadius="5px";
        this.el.nativeElement.style.textAlign="center";
        this.el.nativeElement.innerText="loksdk";


    }
}