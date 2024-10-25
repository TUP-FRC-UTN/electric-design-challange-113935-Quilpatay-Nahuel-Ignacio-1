import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './budget-list.component.html',
})
export class BudgetListComponent {
  
  constructor(private budgetService: BudgetService) {}
  
  budgets$ = this.budgetService.getBudgets();
  
  ngOnInit(): void {}
}
