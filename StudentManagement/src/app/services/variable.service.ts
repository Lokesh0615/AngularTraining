import { Injectable } from "@angular/core";
import { ConfirmationService } from 'primeng/api';
import {  Router } from '@angular/router';

@Injectable()

export class VariableService {

    constructor(private confirmationService: ConfirmationService, private router: Router) { }
    showStudentDetails = true;
    // for bloodGroup
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
    // for department header
    departmentHeader = [
        { name: 'Department Id', fieldName: 'departmentId' },
        { name: 'Department Name', fieldName: 'departmentName' },
        { name: 'No Of Student', fieldName: 'noOfEmployee' },
        { name: 'Manager Id', fieldName: 'managerId' },
        { name: 'Created Source', fieldName: 'createdSource' },
        { name: 'Created Source Type', fieldName: 'createdSourceType' },
        { name: 'CreatedDttm', fieldName: 'createdDttm' },
        { name: 'Modified Source', fieldName: 'modifiedSource' },
        { name: 'Modified Source Type', fieldName: 'modifiedSourceType' },
        { name: 'ModifiedDttm', fieldName: 'modifiedDttm' },
    ]
    // for department dropdowns
    departmentList = [
        { departmentName: 'Civil', departmentCode: 'civil', departmentId: 1 },
        { departmentName: 'Mechanical', departmentCode: 'mechanical', departmentId: 2 },
        { departmentName: 'Compuetr Scince', departmentCode: 'computer scince', departmentId: 3 },
        { departmentName: 'Electronics & Electrical', departmentCode: 'electronics & electical', departmentId: 4 }
    ]
    //  fro student table header
    studentTableHeaders = [
        { name: 'Student Id', fieldName: 'studentId' },
        { name: 'First Name', fieldName: 'firstName' },
        { name: 'Last Name', fieldName: 'lastName' },
        { name: 'Date of Birth', fieldName: 'dob' },
        { name: 'Gender', fieldName: 'gender' },
        { name: 'Phone Number', fieldName: 'phoneNumber' },
        { name: 'Date of Joining', fieldName: 'dateOfJoining' },
        { name: 'Created Source', fieldName: 'createdSource' },
        { name: 'Created Source Type', fieldName: 'modifiedDttm' },
        { name: 'CreatedDttm', fieldName: 'createdDttm' },
        { name: 'Modified Source', fieldName: 'modifiedSource' },
        { name: 'Modified Source Type', fieldName: 'modifiedSourceType' },
        { name: 'ModifiedDttm', fieldName: 'modifiedDttm' },
    ]
    // for attendance table header
    attendanceTableHeader = [
        { name: 'Student Id', fieldName: 'studentId' },
        { name: 'Date', fieldName: 'date' },
        { name: 'Department Id', fieldName: 'departmentId' },
        { name: 'Available', fieldName: 'available' },
        { name: 'CheckIn', fieldName: 'checkIn' },
        { name: 'Checkout', fieldName: 'checkout' },
        { name: 'Attendance Count', fieldName: 'attendanceCount' },
        { name: 'Created Source', fieldName: 'createdSource' },
        { name: 'Created Source Type', fieldName: 'createdSourceType' },
        { name: 'CreatedDttm', fieldName: 'createdDttm' },
        { name: 'Modified Source', fieldName: 'modifiedSource' },
        { name: 'Modified Source Type', fieldName: 'modifiedSourceType' },
        { name: 'ModifiedDttm', fieldName: 'modifiedDttm' },

    ]

    // to get formated attendance detalis
    getFormatedAttendanceData(studentDetailsFormvalue: any) {

        let attendanceData = {
            studentId: studentDetailsFormvalue.studentId,
            departmentId: Number(studentDetailsFormvalue.departmentId),
            date: studentDetailsFormvalue.date,
            // need to convert boolean to string
            available: String(studentDetailsFormvalue.available),
            checkIn: studentDetailsFormvalue.checkIn,
            checkout: studentDetailsFormvalue.checkout,
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

    // to exit from page while updating the form details
    canExit(path: string) {
        this.confirmationService.confirm({
            message: 'Do you want to exit?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.router.navigate([path])
            },
            reject: () => { }
        });
    }
}
