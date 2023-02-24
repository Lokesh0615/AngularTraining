import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products=[
    {id:2, name:"minimal analog watch", price:123,color:"black", available:"yes", image:"/assets/header.jpg"},
    {id:3, name:"HD tv", price:12222,color:"black-white", available:"no", image:"/assets/header.jpg"},
    {id:4, name:" watch", price:123,color:"black", available:"yes", image:"/assets/header.jpg"},
    {id:5, name:"HD tv", price:12222,color:"black-white", available:"yes", image:"/assets/header.jpg"},
    {id:6, name:" watch", price:123,color:"black", available:"no", image:"/assets/header.jpg"},
    {id:7, name:"minimal analog watch", price:123,color:"black", available:"yes", image:"/assets/header.jpg"},
    {id:8, name:"HD tv", price:12222,color:"black-white", available:"no", image:"/assets/header.jpg"},
    {id:9, name:" watch", price:123,color:"black", available:"yes", image:"/assets/header.jpg"},
    {id:10, name:"HD tv", price:12222,color:"black-white", available:"yes", image:"/assets/header.jpg"},
    {id:11, name:" watch", price:123,color:"black", available:"no", image:"/assets/header.jpg"},
    {id:12, name:"minimal analog watch", price:123,color:"black", available:"yes", image:"/assets/header.jpg"},
    {id:13, name:"HD tv", price:12222,color:"black-white", available:"no", image:"/assets/header.jpg"},
    {id:14, name:" watch", price:123,color:"black", available:"yes", image:"/assets/header.jpg"},
    {id:15, name:"HD tv", price:12222,color:"black-white", available:"yes", image:"/assets/header.jpg"},
    {id:16, name:" watch", price:123,color:"black", available:"no", image:"/assets/header.jpg"}
  ]
  getToatalProducs() :number{
    return this.products.length;
  }
  getToatalAvailableProducts(){
    return this.products.filter(p=> p.available==="yes").length;
  }
  getTotalNotAvailableProducts(){
    return this.products.filter(p=> p.available==="no").length;
  }


  productsCountRadioBtn:string="All";
  onFilterRadioBtnChange(data:string){
    this.productsCountRadioBtn=data;
    // console.log(this.productsCountRadioBtn);
    
  }

  searchP=""
  serchProductInParent(data:any){
    this.searchP=data;
  }
 
 
}
