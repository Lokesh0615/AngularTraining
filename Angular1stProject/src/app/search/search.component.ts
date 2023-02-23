import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchValue:string='';
  // searchValue:string='phone';
  changeSearchValue(evenetData:Event){
    // console.log((<HTMLInputElement>evenetData.target).value);
    this.searchValue=(<HTMLInputElement>evenetData.target).value;
    
  }
}
