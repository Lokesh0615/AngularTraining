import { Injectable } from "@angular/core";
import { StudentDetailesService } from "./studentDetailes";

@Injectable()
export class VariableService {
    showStudentDetails = true;
    studentId!: string;
   

    bloodGroupList=[
        {type:"O+"},
        {type:"O-"},
        {type:"A+"},
        {type:"A-"},
        {type:"B+"},
        {type:"B-"},
        {type:"AB+"},
        {type:"AB-"},
    ]
    departmentList = [
        { department: 'Civil', departmentId: 1 },
        { department: 'Mechanical', departmentId: 2 },
        { department: 'Computer scince', departmentId: 3 },
        { department: 'Electronices & Electrical', departmentId: 4 }
    ];

    formatedStudentData(studentDetailsFormvalue: StudentDetailesService) {
        let studentData = {
            studentId: studentDetailsFormvalue.studentId,
            firstName: studentDetailsFormvalue.firstName,
            lastName: studentDetailsFormvalue.lastName,
            dob: studentDetailsFormvalue.dob,
            gender: studentDetailsFormvalue.gender,
            phoneNumber: studentDetailsFormvalue.phoneNumber,
            createdSource: studentDetailsFormvalue.createdSource,
            createdSourceType: studentDetailsFormvalue.createdSourceType,
            createdDttm: studentDetailsFormvalue.createdDttm,
            modifiedSource: studentDetailsFormvalue.modifiedSource,
            modifiedSourceType: studentDetailsFormvalue.modifiedSourceType,
            modifiedDttm: studentDetailsFormvalue.modifiedDttm,
            bloodGroup: studentDetailsFormvalue.bloodGroup.type,
            address: studentDetailsFormvalue.address,
            dateOfJoining: studentDetailsFormvalue.dateOfJoining,
            department: studentDetailsFormvalue.department.department,
            departmentId: studentDetailsFormvalue.departmentId.departmentId,
            mailId: studentDetailsFormvalue.mailId,
        }
        return studentData;
    }

    getFormatedStudentData(studentDetailsFormvalue: StudentDetailesService){

        let studentData = {
            studentId: Number(studentDetailsFormvalue.studentId),
            firstName: studentDetailsFormvalue.firstName,
            lastName: studentDetailsFormvalue.lastName,
            dob: studentDetailsFormvalue.dob,
            gender: studentDetailsFormvalue.gender,
            phoneNumber: studentDetailsFormvalue.phoneNumber,
            createdSource: studentDetailsFormvalue.createdSource,
            createdSourceType: studentDetailsFormvalue.createdSourceType,
            createdDttm: studentDetailsFormvalue.createdDttm,
            modifiedSource: studentDetailsFormvalue.modifiedSource,
            modifiedSourceType: studentDetailsFormvalue.modifiedSourceType,
            modifiedDttm: studentDetailsFormvalue.modifiedDttm,
            bloodGroup: studentDetailsFormvalue.bloodGroup,
            address: studentDetailsFormvalue.address,
            department: studentDetailsFormvalue.department,
            departmentId: studentDetailsFormvalue.departmentId,
            mailId: studentDetailsFormvalue.mailId,
            dateOfJoining: studentDetailsFormvalue.dateOfJoining,
        }
        return studentData;
    }
}