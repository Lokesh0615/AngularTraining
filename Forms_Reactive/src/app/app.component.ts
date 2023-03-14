import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Forms_Reactive';

  reactiveForm!: FormGroup;

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      personal: new FormGroup({
        fname: new FormControl(null, Validators.required),
        lname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),

      }),
      country: new FormControl(null, [Validators.required]),
      gender: new FormControl('male'),
      hobbies: new FormControl(null),
    })
  }

  onSubmit() {
    console.log(this.reactiveForm);
    console.log(this.reactiveForm.get('personal.email')?.valid);
    
  }
}
