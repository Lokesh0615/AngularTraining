import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router, CanActivate } from '@angular/router';
import{ map, Subject, catchError } from 'rxjs'
import { throwError } from 'rxjs';
import { identifierName } from '@angular/compiler';
import { APIService } from './APIservice.service';

@Injectable()
export class LoginService {
    userData!:any;
    logged_in!:boolean;
    logged_in_userId!:number;
    logged_in_user!:string;
    
    constructor(private httpClient:HttpClient, private route:Router, private APIService:APIService){}
    
    // admin={user_id:'admin', password:'admin',logged_in:this.logged_in}
    sampleInput=''
    login(userName:string, password:string){
      let checkUser;
      this.APIService.checkUserExists(userName, password).subscribe((resluts)=>{
        console.log(resluts);
        checkUser=resluts
        if(checkUser){
          console.log(checkUser);
          
          this.route.navigateByUrl('Home')
          this.sampleInput=password;
          this.logged_in=true;
              let admin={user_id:'admin', password:'admin',logged_in:this.logged_in,"childComponentOpend":false}
              localStorage.setItem('admin',JSON.stringify(admin))
        }else{
          alert('Incorrect UserID or Password')
          // return false;
          
      }
        
      }, (error)=>{})
      if(checkUser){
        console.log(checkUser);
        
        // this.route.navigateByUrl('Home')
        // this.sampleInput=password;
        // this.logged_in=true;
        //     // this.admin={user_id:'admin', password:'admin',logged_in:this.logged_in}
            // localStorage.setItem('admin',JSON.stringify(this.admin))
      // }
        // if(user_id===this.admin.user_id && password===this.admin.password){
        //     this.sampleInput=password;
        //     this.logged_in=true;
        //     this.admin={user_id:'admin', password:'admin',logged_in:this.logged_in}
        //     localStorage.setItem('admin',JSON.stringify(this.admin))
        //     this.route.navigateByUrl('Home')
        //     console.log();
            // return true;
            
        }
        // else{
        //     alert('Incorrect UserID or Password')
        //     // return false;
            
        // }
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
             let path=this.userData.path;
             console.log(this.userData.logged_in);
             
             console.log(this.userData.password);
             console.log(this.userData.childComponentOpend);
             console.log(this.userData.path);
             
            //  this.route.navigate(this.userData.path)
             

        }
      }
     
      setChildComponentRefresh(value:boolean){
        let admin={user_id:'admin', password:'admin',logged_in:true, childComponentOpend:value}
        localStorage.setItem('admin',JSON.stringify(admin))
      }
      logOut(){
        this.logged_in=false;
        localStorage.clear();
        this.route.navigateByUrl('')
        console.log(localStorage.length);
        
      }

      signUpUser(){
        
      }
}