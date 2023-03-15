import { Injectable} from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Products } from '../model/products'
import{ map } from 'rxjs'

@Injectable()
export class ProductsService{

    constructor(private http:HttpClient){}
    // create product
    createProduct(product:{pname:string, pdescription:string, pprice:string}){
        this.http.post('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json', product).subscribe()
    }

    // fetch Products
    fetchProduct(){
        let products:Products[]=[];

        this.http.get<{[key:string]:Products}>('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json')
        .pipe(map((res)=>{
            for(let key in res){
                // console.log({...res[key]});
                products.push( {...res[key], id:key} )
            }
            // console.log(products);
            
            return products;
        })).subscribe((prod)=>{
            // console.log(products);
            // products=prod;
            // return prod
        })
        // console.log(products);
        
        return products;
    }

    // delete product
    deleteProduct(id:string){
        this.http.delete('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products/'+id+'.json').subscribe()
    }

   
    // delete all products
    deleteAll(){
        this.http.delete('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json').subscribe()
    }

    // update method
    updateProduct(id:string, value:{ pname: string, pdescription: string, pprice: string }){
        // console.log(id);
        // console.log(value);
        
        this.http.put('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products/'+id+'.json', value).subscribe()
    }
}