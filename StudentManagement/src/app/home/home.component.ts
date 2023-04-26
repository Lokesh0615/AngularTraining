import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let storage = localStorage;
    storage.setItem('icons', JSON.stringify({ 'title': 'Home', 'icon': 'pi pi-home' }))
    storage.setItem('path', 'Home')
  }
  
}
