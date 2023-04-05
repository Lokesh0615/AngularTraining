export class AttendanceDetailsService{
    
        // id!: number,
        // "employeeId": "5",
        // "month": "02",
        // "date": "23",
        // "departmentId": "c1",
        // "available": true,
        // "checkIn": "true",
        // "checkout": "no",
        // "attendanceCount": 3,
        // "createdSource": "admin",
        // "createdSourceType": "admin",
        // "createdDttm": "kskdk",
        // "modifiedSource": "admin",
        // "modifiedSourceType": "admin",
        // "modifiedDttm": "adminss"

        studentId!:number;
        month!:string;
        date!:Date;
    departmentId!:number;
    available!: true;
    checkIn!: "true";
    checkout!: "no";
    attendanceCount!: 3;
    dateOfJoining!:Date;
    createdSource!:string;
    createdSourceType!:string;
    createdDttm!:Date;
    modifiedSource!:string;
    modifiedSourceType!:string;
    modifiedDttm!:Date;
    
}