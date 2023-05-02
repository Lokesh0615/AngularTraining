import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class APIService {

    constructor(private httpClient: HttpClient) { }
    // user controller
    // to check user exist or not
    checkUserExists(userId: string, password: string) {
        return this.httpClient.get('http://localhost:9090/userAccount/checkuserexists?employeeId=' + userId + '&password=' + password + '')

    }
    // to add new user
    addNewUser(userId: string, password: string) {
        let userData = { employeeId: userId, password: password, type: "User" }
        return this.httpClient.post('http://localhost:9090/userAccount/adduseraccount', userData)
    }

    // Student controller
    // for adding new student
    addStudent(studentData: object) {
        return this.httpClient.post('http://localhost:9090/studentdetail/addstudent', studentData)
    }

    // to get all student details
    fetchAllStudentsDetails() {
        return this.httpClient.get('http://localhost:9090/studentdetail/findallstudents')
    }

    // to get student details by id
    fetchByStudentId(studentId: string) {
        return this.httpClient.get('http://localhost:9090/studentdetail/findbystudentid?studentId=' + studentId + '')

    }
    // to delete student record by student id
    deleteByStudentId(studentId: string) {
        return this.httpClient.delete('http://localhost:9090/studentdetail/deletebystudentid?studentId=' + studentId + '')

    }
    // to update student details  
    updateStudentDetails(studentData: object) {
        return this.httpClient.put('http://localhost:9090/studentdetail/updatestudent', studentData)
    }

    // department controller
    // to get all depatrment details
    fetchAllDepartmentDetailes() {
        return this.httpClient.get('http://localhost:9090/departmentdetail/findalldepartment')
    }
    // to get departmnet details by department id
    fetchDepartmentByDptId(departmentId: string) {
        return this.httpClient.get('http://localhost:9090/departmentdetail/findDepartmentByEmpId?departmentId=' + departmentId + '')
    }

    // Attendance controller
    // to get all attendance details
    fetchAllAttendanceDetailes() {
        return this.httpClient.get('http://localhost:9090/attendanceDetail/findAllAttendance')
    }
    // to delete record by student id and department id
    deleteAttendanceByStdIdDeptId(studentId: string, departmentId: string) {
        return this.httpClient.delete('http://localhost:9090/attendanceDetail/deleteByEmpIdDepId?employeeId=' + studentId + '&departmentId=' + departmentId + '')
    }
    // to get attendance details by student id
    fecthAttendanceByStudentId(studentId: string) {
        return this.httpClient.get('http://localhost:9090/attendanceDetail/findAttendanceByEmpId?employeeid=' + studentId + '')
    }
    // to update the attendance
    updateAttendance(attendanceData: object) {
        return this.httpClient.put('http://localhost:9090/attendanceDetail/updateAttendance', attendanceData)
    }
    // to add attendance details
    addAttendanceDetails(attendanceData: object) {
        return this.httpClient.post('http://localhost:9090/attendanceDetail/addAttendance', attendanceData)
    }

}