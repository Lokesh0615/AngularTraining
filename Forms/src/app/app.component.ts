import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Forms';
  @ViewChild('myForm') form!:NgForm;
  defaultCountry="India"

  fname1='';
  lname1='';
  email1='';
  country1='';
  gen1='';



  // radio button
  defaultGender="Male"
  gender =[
    {id:'1', value:'Male'},
    {id:'2', value:"Female"},
    {id:'3', value:'Other'}
  ]

  // onSubmit(form:HTMLFormElement){ notmal dom element
  onSubmit(form:NgForm){
    console.log(form);
    // console.log(this.defaultGender);
    this.fname1=this.form.value.personal.fname;
    this.lname1=this.form.value.personal.lname;
    this.email1=this.form.value.personal.email;
    this.country1=this.form.value.country;
    this.gen1=this.form.value.gender;
    this.form.reset()
    
  }

  setDefaultValue(){

    // setValue() method
    // this.form.setValue({
    //   country:'India',
    //   gender: 'Female',
    //   hobbies:'music',
    //   personal:{
    //     fname:'lokesh',
    //     lname:'N',
    //     email:'abcd@gmail.com'
    //   }
    // })

    // patchVAlue() method
    this.form.form.patchValue({
      personal:{
       
        fname:"LOKKesh",
        lname:'N',
        email:'abcd@gmail.com'
      }
    })
  }
}
