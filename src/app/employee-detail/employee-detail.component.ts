import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent  implements OnInit{

  employee: any;

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) {}


  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployeeById(Number(id)).subscribe(data => {
      this.employee = data;
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  }

}
