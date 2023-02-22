import { Component, OnInit } from '@angular/core';

@Component({
  // [app-nav] used as a html attribute
  // .app-nav as a css class
  // selector:"app-nav",
  selector: '[app-nav]',
    // selector: '.app-nav',
  templateUrl: './nav.component.html',
  // template:`<div><p>websiteeeee</p></div>`
  styleUrls: ['./nav.component.css']
  // styles:[`div{margin: 10px 0px;padding: 10px 20px; background-color: red;}`]
})
export class NavComponent {

}
