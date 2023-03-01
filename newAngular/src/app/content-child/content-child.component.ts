import { AfterContentInit, Component, ContentChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-child',
  templateUrl: './content-child.component.html',
  styleUrls: ['./content-child.component.css']
})
export class ContentChildComponent implements OnInit, AfterContentInit {
  @ContentChild("para",{static:true}) para1!:ElementRef;
  
  ngOnInit(){
    console.log(this.para1);
    
  }
  ngAfterContentInit(): void {
    console.log(typeof this.para1);
    
    this.para1.nativeElement.textContent='new value';

    console.log(this.para1.nativeElement.textContent);
    
  }
  // ngAfterContent

  
}
