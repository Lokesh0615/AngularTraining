import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustComponent } from './cust.component';

const routes: Routes = [{ path: '', component: CustComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustRoutingModule { }
