import { Component, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input("Total") all:number=0;
  @Input() yes:number=0;
  @Input() no:number=0;

  selectedRadioBtnValue:string="All";

  @Output()
  filterRadioBtnSelectionChanged =new EventEmitter();
  onRadioBtnSelectionChanged(){
    this.filterRadioBtnSelectionChanged.emit(this.selectedRadioBtnValue);
    // console.log(this.selectedRadioBtnValue);

    
  }
}
