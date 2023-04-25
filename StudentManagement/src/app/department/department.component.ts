import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../services/APIservice.service';
import { LoginService } from '../services/login.service';
import { VariableService } from '../services/variable.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  paginatorDropdown = [{ rows: 5 }, { rows: 10 }, { rows: 15 }]
    // to display number of record selected in dropdown
  paginatorValue: number;
  //  for table header
  departmentHeader = this.variableService.departmentHeader;
  departmentsData: any = [];
    // to dispay the childcomponent details
  showDepartmentDetails!: boolean;
  childComponentOpend!: boolean;

  constructor(private apiService: APIService, private route: Router, private activatedRoute: ActivatedRoute,
    private loginService: LoginService, private variableService: VariableService) { }

  ngOnInit(): void {
    let storage = localStorage;
    storage.setItem('path', 'Department')
    storage.setItem('icons', JSON.stringify({ 'title': 'Department', 'icon': 'pi pi-table' }))
    this.showDepartmentDetails = false;
    this.childComponentOpend = JSON.parse(storage.getItem('admin')).childComponentOpend;

    // getting all departemnt details from database
    this.apiService.fetchAllDepartmentDetailes().subscribe((results) => {
      this.departmentsData = results
    })
  }

  //  to view particular department details
  departmentDetailes(departmenId: string) {
    this.childComponentOpend = true;
    this.loginService.setChildComponentRefresh(true)
    this.route.navigate(['DepartmentDetailes/:' + departmenId + ''], { relativeTo: this.activatedRoute })
  }
}
