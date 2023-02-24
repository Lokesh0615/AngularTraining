import { Component } from "@angular/core";
import{ Output, EventEmitter } from "@angular/core"
@Component({
    selector:"app-output",
    templateUrl:"./output.component.html",
    styleUrls:["./output.component.css"]

})
export class OutputComponent{
    @Output() greetEvent=new EventEmitter();
    name="lokesh";
    inp:string="";
    changeInput(data:Event){
        this.inp=(<HTMLInputElement>data.target).value;
    }
    callParentGreet(){
        this.greetEvent.emit(this.inp)
    }
}