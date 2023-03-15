import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
// import { Promise } from '@angular'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Forms_Reactive';

  reactiveForm!: FormGroup;
  formStatus:any;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      personal: new FormGroup({
        fname: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
        lname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email], this.emailNotAllowed),

      }),
      country: new FormControl(null, [Validators.required]),
      gender: new FormControl('male'),
      hobbies: new FormControl(null),
      skills: new FormArray([
        new FormControl(null, Validators.required),
      ])
    })

    // valueChange event
    // this.reactiveForm.get('personal.fname')?.valueChanges.subscribe((value:any)=>{
    //   console.log(value);
      
    // })

    // this.reactiveForm.valueChanges.subscribe((value:any)=>{
    //   console.log(value);
    // })

    // status change event
    // this.reactiveForm.statusChanges.subscribe((value)=>{
    //   console.log(value);
    //   this.formStatus=value;
      
    // })

    // setValue() method
    // setTimeout(() => {
    //   this.reactiveForm.setValue({
    //     personal:{
    //       fname:'',
    //       lname:'',
    //       email:"okayOkay@gmail.com"
    //     },
    //     country:'',
    //     gender:'',
    //     hobbies:'',
    //     skills:['']
    //   })
    // }, 5000);

    // patchValue()
    // setTimeout(() => {
    //   this.reactiveForm.patchValue({
    //     personal:{
    //       email:"okayOkay@gmail.com"
    //     }
    //   })
    // }, 3000);
  }


  onSubmit() {
    console.log(this.reactiveForm);
    // console.log(this.reactiveForm.get('skills'));
    // console.log((this.reactiveForm.get('personal.fname')?.errors?.["noSpaceAllowed"]));
    
    
  }
  addSkill(){
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required))
  }

  // Custom validation and error codes
  noSpaceAllowed(control:FormControl){
    if(control.value !=null && control.value.indexOf(' ')!=-1){
      return {noSpaceAllowed: true}
    }
    else return null
  }

  // custom Async validator
  emailNotAllowed(control:AbstractControl):Promise<any>| Observable<any>{

    const response=new Promise((resolve, reject)=>{
      setTimeout(() => {
        if(control.value==='lokeshwisher@gmail.com'){
          resolve ({ emailNotAllowed: true})
        }else{
          resolve(null)
        }
      }, 5000);
    })
   return response;
  }

  // allAlphabets(data:String){
  //   let results=''
  //   for(let alp of data){
  //     if(results.indexOf(alp)==-1){
  //       results=results+alp;

  //     }
  //   }
  //   if(results.length==26){
  //     console.log("all aplpabets are not there");
      
  //   }else console.log("all thers");
    
  //   // if(results.indexOf(data))
  // }
}
