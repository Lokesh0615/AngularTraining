import { Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector:"app-search1",
    templateUrl:'./search1.component.html',
    styleUrls:["./search1.component.css"]
})
export class Search1Component{
    enteredSearchVale:string="";

    @Output() searchProduct=new EventEmitter();
    searchProductOut(){
        this.searchProduct.emit(this.enteredSearchVale);
    }
}