import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { ErrorComponent } from './error/error.component';
import { CouresComponent } from './courses/coures/coures.component';
import { AppRoutingModule } from './app-routing.module';
import { CourseGuardService } from './services/couresGuard.service';
import { CoursesSerive } from './services/courses.service';
import { AuthService } from './services/auth.service';
import { CanDeactivateGuardService } from './services/canDeactivateGuard.service';
import { CourseResolveService } from './services/coures-resolve.service';
import { CanLoadService } from './services/canLoad.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CoursesComponent,
    ErrorComponent,
    CouresComponent,
    
    // FormsModule
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(appRout),
    FormsModule,
    AppRoutingModule
  ],
  providers: [CoursesSerive, CourseGuardService, AuthService, CanDeactivateGuardService, CourseResolveService, CanLoadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
