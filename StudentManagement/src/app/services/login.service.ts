import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import{ map, Subject, catchError, Observable } from 'rxjs'
import { throwError } from 'rxjs';
import { identifierName } from '@angular/compiler';
import { APIService } from './APIservice.service';

@Injectable()
export class LoginService implements CanActivate {
    userData!:any;
    logged_in!:boolean;
    logged_in_userId!:number;
    logged_in_user!:string;
    user_password!:string;
    
    constructor(private httpClient:HttpClient, private route:Router, private APIService:APIService){}
  

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(!localStorage.getItem('admin')){
        return true
      }else{
        let path=localStorage.getItem('path');
        this.route.navigateByUrl(path);
        let admin=JSON.parse(localStorage.getItem('admin'))

        // this.logged_in_user=admin.user_id;
        // // this.route.navigateByUrl('Home')
        // // this.sampleInput=password;
        // this.logged_in=true;
        // // let admin={user_id:userName, password:password,logged_in:this.logged_in,"childComponentOpend":false}
        
        // // localStorage.setItem('admin',JSON.stringify(admin))
        // localStorage.setItem('path',path)
        // this.logged_in_user=this.userData.user_id;
        return false
      }
    }
    
    // admin={user_id:'admin', password:'admin',logged_in:this.logged_in}
    sampleInput=''
    login(userName:string, password:string){
      if(userName=='admin' && password=='admin'){
        
    
        this.sampleInput=password;
        this.logged_in=true;
        this.logged_in_user='admin'
            let admin={user_id:'admin', password:'admin',logged_in:this.logged_in,"childComponentOpend":false}
            localStorage.setItem('admin',JSON.stringify(admin))
            localStorage.setItem('path','Home')
            this.route.navigateByUrl('Home')
      }else{
        let checkUser;
        this.APIService.checkUserExists(userName, password).subscribe((resluts)=>{
          console.log(resluts);
          checkUser=resluts
          if(checkUser){
            console.log(checkUser);
            this.logged_in_user=userName;
            this.sampleInput=password;
            this.logged_in=true;
            let admin={user_id:userName, password:password,logged_in:this.logged_in,"childComponentOpend":false}
            
            localStorage.setItem('admin',JSON.stringify(admin))
            localStorage.setItem('path','Home')
            this.logged_in_user=this.userData.user_id;
            this.route.navigateByUrl('Home')

          }else{
            alert('Incorrect UserID or Password')
            // return false;
            
        }
          
        }, (error)=>{})
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
             this.logged_in_user=this.userData.user_id;
            //  let path=this.userData.path;
             console.log(this.userData.logged_in);
             
             console.log(this.userData.password);
             console.log(this.userData.childComponentOpend);
             console.log(this.userData.path);
             
            //  this.route.navigate(this.userData.path)
             

        }
      }
     
      setChildComponentRefresh(value:boolean){
        let admin={user_id:this.logged_in_user, password:this.user_password,logged_in:true, childComponentOpend:value}
        localStorage.setItem('admin',JSON.stringify(admin));
        // this.userData=JSON.parse(localStorage.getItem('admin')|| '{}')
      }
      logOut(){
        this.logged_in=false;
        localStorage.clear();
        this.route.navigateByUrl('')
        // localStorage.setItem('path', '')
        console.log(localStorage.length);
        
      }

      signUpUser(){
        
      }
}