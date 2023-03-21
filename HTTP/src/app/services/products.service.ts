import { Injectable} from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http"
import { Products } from '../model/products'
import{ map, Subject, catchError } from 'rxjs'
import { throwError } from 'rxjs';

@Injectable()
export class ProductsService{

    error= new Subject<string>();

    constructor(private http:HttpClient){}
    // create product
    createProduct(product:{pname:string, pdescription:string, pprice:string}){
        let headers = new HttpHeaders({ 'myHeader': 'product' })
        headers=headers.append('newAppendHeader', 'append')
        this.http.post('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json'
        ,product, {headers:headers, observe:'body'})
        .subscribe((res)=>{
            console.log(res);
            
        }
        , (err)=>{
            console.log(err);
            this.error.next(err.message)
        })
    }


    // fetch Products
    fetchProduct(){
        const header= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('access-control-allow-origin', '*')

        let params=new HttpParams().set('print',"pretty")
      return  this.http.get('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json'
      , {headers:header, params:params, responseType:'json', observe:'body', withCredentials:false})
        .pipe(map((res)=>{
            console.log(res);
            
            let products:Products[]=[];
            for(let key in res){
                // console.log({...res[key]});
                products.push( {...res[key], id:key} )
            }
            // console.log(products);
            
            return products;
        }), catchError((err)=>{
            // write the loggic error
            return throwError(err)
        }))
        // .subscribe((prod)=>{
        //     // console.log(products);
        //     // products=prod;
        //     // return prod
        // })
        // console.log(products);
        
        // return products;
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