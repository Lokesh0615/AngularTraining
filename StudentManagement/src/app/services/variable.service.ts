import { Injectable } from "@angular/core";

@Injectable()
export class VariableService {
    showStudentDetails=true;
    studentId!:string;
    departmentList=[
        {department:'Civil', departmentId:'CE' },
        {department:'Mechanical', departmentId:'ME'},
        {department:'Computer scince', departmentId:'CS'},
        {department:'Electronices & Electrical', departmentId:'EE'}
    ];
}