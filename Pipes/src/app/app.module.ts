import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CoursesSerive } from './courses.service';
import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe'

@NgModule({
  declarations: [
    AppComponent,
    ShortenPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CoursesSerive],
  bootstrap: [AppComponent]
})
export class AppModule { }
