import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable()
export class APIService{

    constructor(private HttpClient:HttpClient){

    }
    // user controller
    checkUserExists(userId:string, password:string){
        return this.HttpClient.get('http://localhost:9090/userAccount/checkuserexists?employeeId='+userId+'&password='+password+'')
        
    }
    addUser(userId:string, password:string){
        let userData={employeeId:userId, password:password, type:"User"}
        return this.HttpClient.post('http://localhost:9090/userAccount/adduseraccount', userData)
    }

    // Student controller
    addStudent(studentData:object){
        return this.HttpClient.post('http://localhost:9090/studentdetail/addstudent', studentData)
    }
    
    findAllStudents(){
        return this.HttpClient.get('http://localhost:9090/studentdetail/findallstudents')
    }

    findByStudentId(studentId:string){
       return this.HttpClient.get('http://localhost:9090/studentdetail/findbystudentid?studentId=' + studentId + '')
       
    }
    deleteByStudentId(studentId:number){
        return this.HttpClient.delete('http://localhost:9090/studentdetail/deletebystudentid?studentId='+studentId+'')
        
    }
    updateStudentDetails(studentData:object){
        return this.HttpClient.put('http://localhost:9090/studentdetail/updatestudent', studentData)
    }

    // department controller
    getAllDepartmnetDetailes(){
        return this.HttpClient.get('http://localhost:9090/departmentdetail/findalldepartment')
    }
    findDepartmentByDptId(departmentId:string){
        return this.HttpClient.get('http://localhost:9090/departmentdetail/findDepartmentByEmpId?departmentId='+departmentId+'')
    }

    // Attendance controller

    getAllAttendanceDetailes(){
        return this.HttpClient.get('http://localhost:9090/attendanceDetail/findAllAttendance')
    }

    findAttendanceByStudentIdDepartmentId(studentId:string, departmentId:string){
        return this.HttpClient.get('http://localhost:9090/attendanceDetail/findByEmployeeIdDepartmentId?employeeid='+studentId+'&departmentid='+departmentId+'')
    }

    deleteAttendanceByStdIdDeptId(studentId:string, departmentId:string){
        return this.HttpClient.delete('http://localhost:9090/attendanceDetail/deleteByEmpIdDepId?employeeId='+studentId+'&departmentId='+departmentId+'')
    }
    findAttendanceByStudentId(studentId:string){
        return this.HttpClient.get('http://localhost:9090/attendanceDetail/findAttendanceByEmpId?employeeid='+studentId+'')
    }

    updateAttendance(attendanceData:object){
        return this.HttpClient.put('http://localhost:9090/attendanceDetail/updateAttendance', attendanceData)
    }

    addAttendanceDetails(attendanceData:object){
        return this.HttpClient.post('http://localhost:9090/attendanceDetail/addAttendance', attendanceData)
    }
   
}