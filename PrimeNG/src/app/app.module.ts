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
import { EditorModule } from 'primeng/editor';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PaginatorModule } from 'primeng/paginator';
import { TreeTableModule } from 'primeng/treetable';




// my services
import { FormService } from './form.service';
import { ConfirmAlertService } from './confirmAlert.service';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TableComponent } from './table/table.component'
import {VirtualScrollerModule} from 'primeng/virtualscroller';


@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    TableComponent
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
    InputNumberModule,
    EditorModule,
    KeyFilterModule,
    PaginatorModule,
    VirtualScrollerModule,
    TreeTableModule,
  ],
    
    providers: [ ConfirmationService, MessageService, FormService, ConfirmAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
