import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ProductsService } from './services/products.service';
import { AuthInterceptorSrvice } from './auth-interceptor.service';
import { LoggingInterceptorService } from './logging-interceptor.service';

// primeng
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {TableModule} from 'primeng/table';  

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AccordionModule,
    TableModule
    
  ],
  providers: [ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorSrvice,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
