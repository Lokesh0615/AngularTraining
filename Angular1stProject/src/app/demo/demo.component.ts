import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  sayHello(data: HTMLInputElement){
    // alert (`hello ${data.value}`)
    console.log(data);
    
  }
}
