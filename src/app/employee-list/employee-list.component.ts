import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';

interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {

  searchQuery: string = '';

  employees: any[] = [];
  filteredEmployees: any[] = [];


  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {

    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  onSearch() {
    this.filteredEmployees = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    console.log('Search query:', this.searchQuery);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.filteredEmployees = this.filteredEmployees.filter(emp => emp.id !== id);
      });
    }
  }
}

