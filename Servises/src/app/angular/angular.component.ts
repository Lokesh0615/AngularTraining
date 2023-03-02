import { Component } from '@angular/core';
import { EnrollService } from '../Servicees/enroll.service';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent {
title="Angular";
onEnroll(){
  const enrollService=new EnrollService();
  enrollService.OnEnrollClicked(this.title);
}
}
