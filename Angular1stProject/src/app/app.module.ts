import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule} from "@angular/forms";

// my server component
import { ServerComponent } from './server/server.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { NotificationComponent } from './notification/notification.component';
import { SearchComponent } from './search/search.component';
import { ProductsComponent } from './products/products.component';
import { FilterComponent } from './filter/filter.component';
import { OutputComponent } from './output/output.component';
import { Search1Component } from './search1/search1.component';
import { DemoComponent } from './demo/demo.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AgeComponent } from './age/age.component'

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    NavComponent,
    HeaderComponent,
    NotificationComponent,
    SearchComponent,
    ProductsComponent,
    FilterComponent,
    OutputComponent,
    Search1Component,
    DemoComponent,
    CustomerListComponent,
    AgeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
