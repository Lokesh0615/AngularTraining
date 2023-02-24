import { Component } from '@angular/core';
// import { Customer } from './customer';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
 selectedCustomer:any;

Customers=[
  {customerNo:1,  name:"lokesh", address:"kkk", city:"bang", country:"Ind"},
  {customerNo:2,  name:"loki", address:"ll", city:"ba", country:"Ind"},
  {customerNo:3,  name:"lo", address:"l", city:"bg", country:"Ind"},
  {customerNo:4,  name:"loy", address:"kklk", city:"ng", country:"Ind"},
  {customerNo:4,  name:"lokesh", address:"llkk", city:"ang", country:"Ind"}
 ]
}
