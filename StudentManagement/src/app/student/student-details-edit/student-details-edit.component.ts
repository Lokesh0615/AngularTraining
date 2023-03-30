import { Component,  OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/services/APIservice.service';
import { StudentDetailesService } from 'src/app/services/studentDetailes';

@Component({
  selector: 'app-student-details-edit',
  templateUrl: './student-details-edit.component.html',
  styleUrls: ['./student-details-edit.component.css']
})
export class StudentDetailsEditComponent implements OnDestroy{

  course!: any;
  studentId!: any;
  courseName!: any;
  routeParaObs!: any;
  studentData!: any;
  studentData1!: [];
  studentData2!: [];
  studentDataEdit!:{};
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private APIService: APIService, private StudentDetailesService:StudentDetailesService ) { }

  @ViewChild('studentDetailsForm') studentDetailsForm!:NgForm;
  ngOnInit() {
    //if the parameter value changes then use Obeservables
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.studentId = parm.get('id')?.substring(1);
    })
    this.APIService.findByStudentId(this.studentId).subscribe((results) => {
      console.log(results);
      this.studentData = Object.entries(results);
      console.log((this.studentData));
      this.studentData1 = this.studentData.slice(0, 9);
      this.studentData2 = this.studentData.slice(9);
      console.log(this.studentData2);
      // this.studentDataEdit=results;
    })
  }

  editStudentDetailes(){
    let data=this.studentDataEdit;
    this.studentDetailsForm.form.setValue({
      // studentId:data.studentId,
    // dob!:Date;
    // gender!:string;
    // bloodGroup!:string;
    // phoneNumber!:number;
    // address!:string;
    // department!:string;
    // departmentId!:string;
    // mailId!:string;
    // firstName!:string;
    // lastName!:string;
    // dateOfJoining!:string;
    // createdSource!:string;
    // createdSourceType!:string;
    // createdDttm!:string;
    // modifiedSource!:string;
    // modifiedSourceType!:string;
    // modifiedDttm!:string;
    })
  }

  ngOnDestroy(): void {
    this.router.navigate(['Student'])
  }
}
