import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

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
import { UsersComponent } from './home/users/users.component';
import {TableModule} from 'primeng/table';



// "router"
const appRoute:Routes=[
  {path:'', component:LoginComponent},
  {path:'Home', canActivate:[AuthGuardService], component:HomeComponent,
    children:[{path:'Home/Users', component:UsersComponent}]
  },
  {path:'Login', component:LoginComponent},
  // {path:'Home/Users', component:UsersComponent},
  {path:"**",  component:LoginComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsersComponent,

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
    
  ],
  providers: [LoginService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
