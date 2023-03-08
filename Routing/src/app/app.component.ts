import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Routing';
  constructor(private activatedRoute:ActivatedRoute){}
 
  ngOnInit(): void {
    this.activatedRoute.fragment.subscribe((value)=>{
      console.log(value);
      
      this.jumpTo(value)
    })
    // document.getElementById("home")?.style.backgroundColor
  }

  jumpTo(section:any){
    document.getElementById(section)?.scrollIntoView({behavior:'smooth'});
    // document.getElementById(section).

    let b=String(section);
    let c=document.getElementById(b);
  }

}
