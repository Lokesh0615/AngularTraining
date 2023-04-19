import {Injectable } from "@angular/core";

@Injectable()

export class VariableService {
    showStudentDetails = true;
    bloodGroupList = [
        { type: "O+" },
        { type: "O-" },
        { type: "A+" },
        { type: "A-" },
        { type: "B+" },
        { type: "B-" },
        { type: "AB+" },
        { type: "AB-" },
    ]
    departmentHeader=[
        {name:'Department Id', fieldName:'departmentId'},
        {name:'Department Name', fieldName:'departmentName'},
        {name:'No Of Student', fieldName:'noOfEmployee'},
        {name:'Manager Id', fieldName:'managerId'},
        {name:'Created Source', fieldName:'createdSource'},
        {name:'Created Source Type', fieldName:'createdSourceType'},
        {name:'CreatedDttm', fieldName:'createdDttm'},
        {name:'Modified Source', fieldName:'modifiedSource'},
        {name:'Modified Source Type', fieldName:'modifiedSourceType'},
        {name:'ModifiedDttm', fieldName:'modifiedDttm'},
    ]
    departmentList = [
        { departmentName: 'Civil', departmentCode:'civil', departmentId: 1 },
        { departmentName: 'Mechanical', departmentCode:'mechanical', departmentId: 2 },
        { departmentName: 'Compuetr Scince',departmentCode:'computer scince', departmentId: 3 },
        { departmentName: 'Electronics & Electrical',departmentCode:'electronics & electical', departmentId: 4 }
    ];
    studentTableHeaders = [
        {name:'Student Id', fieldName:'studentId'}, 
        {name:'First Name', fieldName:'firstName'},
        {name:'Last Name', fieldName:'lastName'},
        {name:'Date of Birth', fieldName:'dob'},
        {name:'Gender', fieldName:'gender'},
        {name:'Phone Number', fieldName:'phoneNumber'},
        {name:'Date of Joining', fieldName:'dateOfJoining'},
        {name:'Created Source', fieldName:'createdSource'},
        {name:'Created Source Type', fieldName:'modifiedDttm'},
        {name:'CreatedDttm', fieldName:'createdDttm'},
        {name:'Modified Source', fieldName:'modifiedSource'},
        {name:'Modified Source Type', fieldName:'modifiedSourceType'},
        {name:'ModifiedDttm', fieldName:'modifiedDttm'},
    ]
    attendanceTableHeader=[
        {name:'Student Id', fieldName:'studentId'},
        {name:'Date', fieldName:'date'},
        {name:'Department Id', fieldName:'departmentId'},
        {name:'Available', fieldName:'available'},
        {name:'CheckIn', fieldName:'checkIn'},
        {name:'Checkout', fieldName:'checkout'},
        {name:'Attendance Count', fieldName:'attendanceCount'},
        {name:'Created Source', fieldName:'createdSource'},
        {name:'Created Source Type', fieldName:'createdSourceType'},
        {name:'CreatedDttm', fieldName:'createdDttm'},
        {name:'Modified Source', fieldName:'modifiedSource'},
        {name:'Modified Source Type', fieldName:'modifiedSourceType'},
        {name:'ModifiedDttm', fieldName:'modifiedDttm'},

    ]

    getFormatedStudentData(data: any) {

        let studentData={
        studentId:data.studentId,
        firstName:data.firstName,
        lastName:data.lastName,
        dob:data.dob,
        gender:data.gender,
        phoneNumber:data.phoneNumber,
        createdSource:data.createdSource,
        createdSourceType:data.createdSourceType,
        createdDttm:data.createdDttm,
        modifiedSource:data.modifiedSource,
        modifiedSourceType:data.modifiedSourceType,
        modifiedDttm:data.modifiedDttm,
        bloodGroup:data.bloodGroup,
        address:data.address,
        department:data.department,
        departmentId:Number(data.departmentId),
        mailId:data.mailId,
        dateOfJoining:data.dateOfJoining,
        }

        return studentData;
    }

    getFormatedAttendanceData(studentDetailsFormvalue: any) {
        console.log(studentDetailsFormvalue);
        
        let attendanceData = {
            studentId: Number(studentDetailsFormvalue.studentId),
            departmentId: Number(studentDetailsFormvalue.departmentId),
            date: studentDetailsFormvalue.date,
            available:String(studentDetailsFormvalue.available),
            checkIn:studentDetailsFormvalue.checkIn,
            checkout:studentDetailsFormvalue.checkout,
            attendanceCount: Number(studentDetailsFormvalue.attendanceCount),
            createdSource: studentDetailsFormvalue.createdSource,
            createdSourceType: studentDetailsFormvalue.createdSourceType,
            createdDttm: studentDetailsFormvalue.createdDttm,
            modifiedSource: studentDetailsFormvalue.modifiedSource,
            modifiedSourceType: studentDetailsFormvalue.modifiedSourceType,
            modifiedDttm: studentDetailsFormvalue.modifiedDttm,
        }
        return attendanceData;
    }
}
