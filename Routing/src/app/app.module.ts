import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { ErrorComponent } from './error/error.component';

const appRout:Routes=[
  { path:"", component:HomeComponent},
  // {path:"", redirectTo:'Home', pathMatch:'full'},
  { path:'Home', component:HomeComponent },
  { path:'About', component:AboutComponent},
  { path:'Contact', component:ContactComponent},
  { path:'Courses', component:CoursesComponent},
  { path:'**', component:ErrorComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CoursesComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRout)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
