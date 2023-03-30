import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// componets
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StudentComponent } from './student/student.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DepartmentComponent } from './department/department.component';
import { StudentDetailsComponent } from './student/student-details/student-details.component';


// services
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/auth-guard.service';

// primeng
import { InputTextModule } from 'primeng/inputtext'
import {PasswordModule} from 'primeng/password';
import {StyleClassModule} from 'primeng/styleclass';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { APIService } from './services/APIservice.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {KeyFilterModule} from 'primeng/keyfilter';
import { StudentDetailsEditComponent } from './student/student-details-edit/student-details-edit.component';
import { StudentDetailesService } from './services/studentDetailes';



const appRoute:Routes=[
  {path:'', component:LoginComponent},
  {path:'Home', canActivate:[AuthGuardService], component:HomeComponent,
    // children:[{path:'Home/Users', component:UsersComponent}]
  },
  {path:'Student', component:StudentComponent,
    children:[{path:'AddStudentDetails', component:StudentDetailsComponent},
              {path:'StudentDetails/:id', component:StudentDetailsEditComponent}
              ]
  },
  {path:'Login', component:LoginComponent},
  // {path:'Home/Users', component:UsersComponent},
  {path:"**",  component:LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    StudentComponent,
    AttendanceComponent,
    DepartmentComponent,
    StudentDetailsComponent,
    StudentDetailsEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
     //primeng
     InputTextModule,
     PasswordModule,
     StyleClassModule,
     BrowserAnimationsModule,
     ButtonModule,
     AvatarModule,
     BadgeModule,
     TableModule,
     DialogModule,
     ToastModule,
     KeyFilterModule,
  ],
  providers: [LoginService, AuthGuardService, APIService, MessageService, StudentDetailesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
