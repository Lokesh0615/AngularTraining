import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'newAngular';
  inputText:string='';
  onSubmit(inputEl:HTMLInputElement){
    this.inputText=inputEl.value;
  }

  source:string="https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg"
  // life cycle hooks
  // destroy:boolean=true;
  // Destroy(){
  //   this.destroy= false;
  // }

  // renderer

  // how structural directive works
  // display:boolean=false;
  // displayNotice(){
  //   this.display=true;
  // }

  // ngSwitch

  occupation:string='';

  
}
