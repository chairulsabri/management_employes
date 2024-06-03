import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent implements OnInit{

  employeeForm: FormGroup;
  today: string;

  constructor(private fb: FormBuilder, private router: Router, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Set the 'today' property to the current date in YYYY-MM-DD format
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onSave() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
