import { Component, OnChanges, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormService } from './form.service';
import { NgForOf } from '@angular/common';
import { ConfirmAlertService } from './confirmAlert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnChanges {
  title = 'PrimeNG';

  sampleInput: string = "HEllo WORLD";
  serverProducts!: { pname: string, pdescription: string, pprice: string, id: string }[]
  userList: { pname: string, pprice: string }[] = [];
  selectedUser: string[] = []
  dob: Date = new Date();
  minDate = new Date('03/16/2023')
  maxDate = new Date('03/31/2023')
  selectedRadio = ''
  checkBox: [] = []
  autocomplet: string[] = ['music', 'playStore', 'audio', 'video']
  autocompletSaerch: string[] = [];
  autoCompleteValue = ''
  dialogShow: boolean = false;
  showdetailes:boolean=false;
  // from variables
  city:string[]=['Bangalore', 'mangalore', 'mysore']
  formData:FormService[]=[]
  hobbies:string[]=[];
  displayForm:boolean=false;
  @ViewChild('myForm') myForm!:NgForm;
  constructor(private formService:FormService, private confirmAlertService:ConfirmAlertService,  private http: HttpClient, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  // form
  onSubmit(myForm:NgForm){
    // console.log(myForm);
    // let con=this.confirmAlertService.checkConfirm();
    let con=this.showdetailes;
    let data=myForm.value;
    // console.log(myForm);
    console.log(con);
    
    
    if(con){
      this.formData.push({'name':data.name, 'job':data.job, 'age':data.age, 'dob':data.dob, 'gender':data.gender, 'city':data.city, 'hobbies':this.checkBox})
      this.messageService.add({severity:'success', summary:'Confirmed', detail:`${data.name} detaiels added`, life:2000 })
      // console.log(this.formData);
      
    }else{
      this.messageService.add({severity:'error', summary:'Canceled', detail:`${data.name} detaiels not added`, life:2000 })
      
    }
    this.displayForm=false

    // console.log(this.formData);
    this.myForm.reset();
    
  }


  // dialod
  showModel() {
    this.dialogShow = true;
  }
  confirm() {
    this.confirmationService.confirm({
      message: 'are you sure that you want to confirm the action?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted',life:2000 });
        console.log('meg');

      },
      reject: () => {
        console.log('rejected');
        this.messageService.add({ severity: 'error', summary: 'canceled', detail: 'You have accepted', life:1000 });

      }
    })
  }
  ngOnChanges() {
    // console.log(this.selectedRadio);
    // console.log((document.getElementById('123') ));

    // checkbox
    console.log(this.checkBox);

  }

  selectedDates(event: Date) {
    console.log(event);

  }
  fetchProduct() {

    // setTimeout(() => {

    this.http.get<{ [key: string]: { pname: string, pdescription: string, pprice: string, id: string } }>('https://angulartraining-ff5f7-default-rtdb.firebaseio.com/products.json')
      .pipe(map((res) => {
        console.log(res);
        const products = [];
        for (const key in res) {
          products.push({ ...res[key], id: key })

        }
        console.log(products);
        return products
      }))
      .subscribe((products) => {
        console.log(products);
        this.serverProducts = products;
        console.log(this.serverProducts.length);
        for (let x of products) {
          this.userList.push({ pname: x.pname, pprice: x.pprice })
        }
        console.log(this.userList);
      })

    // }, 5000);

  }
  public getUsersMultipleParams() {
    const url = 'https://angulartraining-ff5f7-default-rtdb.firebaseio.com';
    let queryParams = { "page": 1, "per_page": 1 };
    console.log(this.http.get(url, { params: queryParams }));
    // this.http.get(url,{params:queryParams});
  }
  dirty(){
    if(this.myForm.dirty || this.myForm.touched){
      console.log(this.myForm);
      
      confirm("do you want to leave")
    }
  }
}
