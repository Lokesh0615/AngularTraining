import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable()
export class APIService{

    constructor(private HttpClient:HttpClient){

    }
    // Student controller
    
    findAllStudents(){
        return this.HttpClient.get('http://localhost:9090/studentdetail/findallstudents')
    }

    findByStudentId(studentId:string){
       return this.HttpClient.get('http://localhost:9090/studentdetail/findbystudentid?studentId=' + studentId + '')
       
    }
    deleteByStudentId(studentId:string){
        return this.HttpClient.delete('http://localhost:9090/studentdetail/deletebystudentid?studentId='+studentId+'')
        console.log("lll");
        
    }
}