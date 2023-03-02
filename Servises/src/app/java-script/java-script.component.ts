import { Component } from '@angular/core';
import { EnrollService } from '../Servicees/enroll.service';

@Component({
  selector: 'app-java-script',
  templateUrl: './java-script.component.html',
  styleUrls: ['./java-script.component.css'],
  // providers: [EnrollService]
})
export class JavaScriptComponent {
  title = "Javascript";
  constructor(private enrollService: EnrollService) { }

  onEnroll() {
    // const enrollService= new EnrollService();
    this.enrollService.OnEnrollClicked(this.title);
  }
}
