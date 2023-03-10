import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { ErrorComponent } from './error/error.component';
import { CouresComponent } from './courses/coures/coures.component';
import { CourseGuardService } from "./services/couresGuard.service";
import { CanDeactivateGuardService } from "./services/canDeactivateGuard.service";
import { CourseResolveService } from "./services/coures-resolve.service";
import { CanLoadService } from "./services/canLoad.service";
import { CustComponent } from "./cust/cust.component";


const appRout:Routes=[
  { path:"", component:HomeComponent},
  // {path:"", redirectTo:'Home', pathMatch:'full'},
  { path:'Home', component:HomeComponent },
  { path:'Cust', loadChildren:()=>import('./cust/cust.module').then(m=> m.CustModule), canLoad:[CanLoadService] },
  { path:'About', component:AboutComponent},
  { path:'Contact', component:ContactComponent, canDeactivate:[CanDeactivateGuardService]},
//   CanActivate
//   { path:'Courses', component:CoursesComponent, canActivate:[CourseGuardService],  children:[
//     { path: 'Coures/:id', component:CouresComponent},
//     { path:'Coures/:name', component:CouresComponent}
//   ] },

//   CanActivateChild
{ path:'Courses', component:CoursesComponent, canActivateChild:[CourseGuardService],
  resolve:{courses:CourseResolveService},
     children:[
    { path: 'Coures/:id', component:CouresComponent},
    { path:'Coures/:name', component:CouresComponent}
] },
  { path: 'cust', loadChildren: () => import('./cust/cust.module').then(m => m.CustModule) },
  // { path:'Courses/Coures/:id', component:CouresComponent},
//   { path:'Courses', children:[
//     { path: 'Coures/:id', component:CouresComponent},
//     { path:'COures/:name', component:CouresComponent}
//   ] },
  { path:'**', component:ErrorComponent}
]
@NgModule({
    imports:[
        RouterModule.forRoot(appRout, {enableTracing:true})
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{}