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
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { AttendanceDetailsComponent } from './attendance/attendance-details/attendance-details.component';
import { AttendanceDetailsEditComponent } from './attendance/attendance-details-edit/attendance-details-edit.component';

// services
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/auth-guard.service';
import { VariableService } from './services/variable.service';
import { APIService } from './services/APIservice.service';
import { AdminGuardServie } from './services/adminGuard.service';

// primeng
import { InputTextModule } from 'primeng/inputtext'
import {PasswordModule} from 'primeng/password';
import {StyleClassModule} from 'primeng/styleclass';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {KeyFilterModule} from 'primeng/keyfilter';
import { StudentDetailsEditComponent } from './student/student-details-edit/student-details-edit.component';
import { MessagesModule } from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService } from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';
import {FileUploadModule} from 'primeng/fileupload';


const appRoute:Routes=[
  {path:'', component:LoginComponent , canActivate:[LoginService]},
  {path:'Home', canActivate:[AuthGuardService], component:HomeComponent,},
  {path:'Student', component:StudentComponent, canActivate:[AuthGuardService, ],
    children:[{path:'AddStudentDetails/:id', component:StudentDetailsComponent, canActivate:[AdminGuardServie]},
              {path:'StudentDetails/:id', component:StudentDetailsEditComponent, canActivate:[AuthGuardService]}
              ]
  },
  {path:'Department', component:DepartmentComponent, canActivate:[AdminGuardServie],
              children:[{path:"DepartmentDetailes/:id", component:DepartmentDetailsComponent, canActivate:[AdminGuardServie]}]
  },
  {path:"Attendance", component:AttendanceComponent, canActivate:[AuthGuardService],
    children:[{ path:"AttendanceDetails/:id", component:AttendanceDetailsEditComponent, canActivate:[AuthGuardService]},
              { path:"AddAttendanceDetails/:id/:did", component:AttendanceDetailsComponent, canActivate:[AdminGuardServie]}
    ]
  },
  {path:"**",  component:LoginComponent, canActivate:[LoginService]}
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
    DepartmentDetailsComponent,
    AttendanceDetailsComponent,
    AttendanceDetailsEditComponent,
    
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
     MessagesModule,
     MessageModule,
     DropdownModule,
     ConfirmDialogModule,
     CalendarModule,
     AutoCompleteModule,
     RadioButtonModule,
     PaginatorModule,
     FileUploadModule,
     
     
  ],
  providers: [LoginService, AuthGuardService, APIService, MessageService, 
               VariableService, AdminGuardServie,
              ConfirmationService,NavbarComponent,  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
