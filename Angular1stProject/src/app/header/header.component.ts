import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  slogan:string="your one stop shop gor everything.";
  source:string="/assets/header.jpg";
  // getSlogan():string{
  //   return "your one stop shop gor everything."
  // }


 }
