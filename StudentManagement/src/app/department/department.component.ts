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

  //  for paginator dropdown to select the no.of rows
  paginatorDropdown = [{ rows: 5 }, { rows: 10 }, { rows: 15 }];

  // to display number of record selected in dropdown
  paginatorValue: number;

  //  for table header names
  departmentHeader:any;

  // to store detaprtments data
  departmentsData: any = [];

  // to display the childcomponent details
  // while showDepartmentDetails is true and childComponentOpend is false then only parent component will display 
  showDepartmentDetails: boolean;

  // to display child component
  childComponentOpend: boolean;

  constructor(private apiService: APIService, private route: Router, private activatedRoute: ActivatedRoute,
    private loginService: LoginService, private variableService: VariableService) { }

  ngOnInit(): void {
    // getting all departemnt details from database
    this.apiService.fetchAllDepartmentDetails().subscribe((results) => {
      this.departmentsData = results;
    });
    let storage = localStorage;
    storage.setItem('path', 'Department');
    storage.setItem('icons', JSON.stringify({ 'title': 'Department', 'icon': 'pi pi-table' }));
    this.showDepartmentDetails = false;
    this.childComponentOpend = JSON.parse(storage.getItem('admin')).childComponentOpend;
    this.departmentHeader=this.variableService.departmentHeader;
  }

  //  to view particular department details
  departmentDetails(departmenId: string) {
    this.childComponentOpend = true;
    this.loginService.setChildComponentRefresh(true);
    this.route.navigate(['DepartmentDetails/:' + departmenId], { relativeTo: this.activatedRoute });
  }
}
