import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustRoutingModule } from './cust-routing.module';
import { CustComponent } from './cust.component';


@NgModule({
  declarations: [
    CustComponent
  ],
  imports: [
    CommonModule,
    CustRoutingModule
  ]
})
export class CustModule { }
