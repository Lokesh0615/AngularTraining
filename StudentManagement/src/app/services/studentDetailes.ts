export class StudentDetailesService {
    studentId!:number;
    dob!:Date;
    gender!:string;
    bloodGroup!:{type:string};
    phoneNumber!:number;
    address!:string;
    department!:{ department: string, departmentId: number };
    departmentId!:{ department: string, departmentId: number };
    mailId!:string;
    firstName!:string;
    lastName!:string;
    dateOfJoining!:Date;
    createdSource!:string;
    createdSourceType!:string;
    createdDttm!:Date;
    modifiedSource!:string;
    modifiedSourceType!:string;
    modifiedDttm!:Date;


}