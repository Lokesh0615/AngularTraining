import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs';
import { Products } from './model/products';
import { NgForm } from '@angular/forms'
import { ProductsService } from './services/products.service';
import { OnDestroy } from '@angular/core';

// primeng
import { TableModule } from 'primeng/table'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'HTTP';

  @ViewChild('productsForm') productsForm!:NgForm;
  serverProducts: Products[] = [];
  // oneData!:{pname:string, pdescription:string, pprice:string};
  oneData:{pname:string, pdescription:string, pprice:string}[]=[];
  isFetching:boolean=false;
  editMode:boolean=false;
  currentProductId!:string;
  errorMessage!:string;
  errorSub!:any;

  constructor(private http: HttpClient, private productService:ProductsService) { }

  // database from service file
  // post data
  sOnProductCreate(products: { pname: string, pdescription: string, pprice: string }){
    if(!this.editMode){
      this.productService.createProduct(products)
    }else{
      this.productService.updateProduct(this.currentProductId, products)
      this.editMode=false;
    }
  
  }

  sFetchProducts(){
    this.productService.fetchProduct().subscribe((products)=>{
      this.serverProducts=products;
      this.isFetching=false;
    }, (err)=>{
      console.log(err);
      // console.log(err.message);
      
      this.errorMessage=err.error.error;
      console.log(this.errorMessage);
      
    })
    console.log(this.serverProducts);
    
  }
  sDeleteProduct(id:string){
    this.productService.deleteProduct(id)
  }
  sDeleteAllProducts(){
    this.productService.deleteAll();
  }

  // psot() method
  onProductCreate(products: { pname: string, pdescription: string, pprice: string }) {
    console.log(products);
    const headers = new HttpHeaders({ 'myHeader': 'product' })
    this.http.post
      ('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json',
        products, { headers: headers })
      .subscribe((response) => {
        // console.log(response);
        this.fetchProduct()
      })
      this.productsForm.reset()
      
  }
  ngOnInit(): void {
    this.errorSub=this.productService.error.subscribe(
    (msg)=>{
      console.log( msg);
      
      this.errorMessage=msg;
    })
    this.sFetchProducts()
    setTimeout(() => {
      console.log(this.serverProducts);
      
  }, 5000);
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe()
  }

  onProductFetch() {
    this.fetchProduct()
  }

  // get(method)
  private fetchProduct() {
    this.isFetching=true;
    setTimeout(() => {
      
      this.http.get<{ [key: string]: Products }>('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json')
      .pipe(map((res) => {
        console.log(res);
        const products = [];
        for (const key in res) {
          products.push({ ...res[key], id: key })
        }
        console.log(products);

        return products
      }))
      .subscribe((products) => {
        console.log(products);
        this.serverProducts = products;
        console.log(this.serverProducts.length);

        // this.serverProducts=Object.values(response);
        this.isFetching=false;

      })

    }, 5000);
    
  }

  // delete() method
  onDeleteProduct(id: string) {
    this.http.delete('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products/' + id + '.json').subscribe();

  }
  onDeleteAllProducts() {
    this.http.delete('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json').subscribe()
  }

  // "update()"
  onEditProduct(id:string){
    // get the product based on id
    let currendtProduct=this.serverProducts.find((p)=>{return p.id===id})
    this.currentProductId=id;
    console.log(currendtProduct);
    
    // populate the form with the product detailes
    this.productsForm.setValue({
      pname: currendtProduct?.pname,
      pdescription:currendtProduct?.pdescription,
      pprice:currendtProduct?.pprice
    })

    // change the button value to edit mode
    this.editMode=true;
  }
  onlyFetch(id:string){
    this.http.get('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products/'+id+'.json')
    .subscribe((data:{pname:string, pdescription:string, pprice:string})=>{
      console.log(data);
      
    this.oneData.push(data)
    })
  }
}
