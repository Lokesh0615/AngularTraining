import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
// Prime ng
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DropdownModule } from 'primeng/dropdown'
import { MultiSelectModule } from 'primeng/multiselect'
import { CalendarModule } from 'primeng/calendar'
import { RadioButtonModule } from 'primeng/radiobutton'
import { CheckboxModule } from 'primeng/checkbox'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'
import {ToastModule} from 'primeng/toast';
import {InputNumberModule} from 'primeng/inputnumber';

// my services
import { FormService } from './form.service';
import { ConfirmAlertService } from './confirmAlert.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    RadioButtonModule,
    CheckboxModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    InputNumberModule
  ],
    
    providers: [ ConfirmationService, MessageService, FormService, ConfirmAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
