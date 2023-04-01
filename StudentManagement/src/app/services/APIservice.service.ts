import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { StudentDetailesService } from "./studentDetailes";


@Injectable()
export class APIService{

    constructor(private HttpClient:HttpClient){

    }
    // Student controller
    addStudent(studentData:StudentDetailesService){
        this.HttpClient.post('http://localhost:9090/studentdetail/addstudent', studentData).subscribe((results)=>{ }, (error)=>{
            console.log(error);
          })
    }
    
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
    updateStudentDetails(studentData:StudentDetailesService){
        return this.HttpClient.put('http://localhost:9090/studentdetail/updatestudent', studentData)
    }
}