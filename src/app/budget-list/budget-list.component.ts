import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Budget } from '../models/budget';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './budget-list.component.html',
})
export class BudgetListComponent {

  budgets$: Observable<Budget[]>;

  constructor(private budgetService: BudgetService) {
    this.budgets$ = this.budgetService.getBudgets();
  }
}
