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
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';
import {TabViewModule} from 'primeng/tabview';
import {SidebarModule} from 'primeng/sidebar';
import {TooltipModule} from 'primeng/tooltip';
import {ChartModule} from 'primeng/chart';


// my services
import { FormService } from './form.service';
import { ConfirmAlertService } from './confirmAlert.service';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TableComponent } from './table/table.component'
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { PrimengExtraComponent } from './primeng-extra/primeng-extra.component';
import { D3Component } from './d3/d3.component';


@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormComponent,
    TableComponent,
    PrimengExtraComponent,
    D3Component
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
    AccordionModule,
    CardModule,
    DividerModule,
    FieldsetModule,
    TabViewModule,
    SidebarModule,
    TooltipModule,
    ChartModule,
  ],
    
    providers: [ ConfirmationService, MessageService, FormService, ConfirmAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
