import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import{ map, Subject, catchError } from 'rxjs'
import { throwError } from 'rxjs';
import { identifierName } from '@angular/compiler';

@Injectable()
export class LoginService implements CanActivate{
    userData!:any;
    constructor(private httpClient:HttpClient, private route:Router){}
    logged_in!:boolean;
    admin={user_id:'admin', password:'admin',logged_in:this.logged_in}
    sampleInput=''
    login(user_id:string, password:string){
        if(user_id===this.admin.user_id && password===this.admin.password){
            this.sampleInput=password;
            this.logged_in=true;
            this.admin={user_id:'admin', password:'admin',logged_in:this.logged_in}
            localStorage.setItem('admin',JSON.stringify(this.admin))
            this.route.navigateByUrl('Home')
            console.log();
            // return true;
            
        }else{
            alert('Incorrect UserID or Password')
            // return false;
            
        }
      }
      autoLogin(){
        
        if(!localStorage){
            return;
        }else{
            console.log('sdfg');
            
            // return JSON.parse(localStorage.getItem('admin'))
            // to avoid error we provide {}, 
             this.userData=JSON.parse(localStorage.getItem('admin')|| '{}')
             this.sampleInput=this.userData.password;
             this.logged_in=this.userData.logged_in;
             console.log(this.userData.logged_in);
             
             console.log(this.userData.password);
             

        }
      }
      canActivate(){
        return true
      }
      logOut(){
        this.logged_in=false;
        localStorage.clear();
        this.route.navigateByUrl('')
        console.log(localStorage.length);
        
      }
}