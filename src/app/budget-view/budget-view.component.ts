import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { BudgetService } from '../services/budget.service';
import { GroupedModules } from '../models/budget';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './budget-view.component.html',
})
export class BudgetViewComponent {
  budgetData$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private budgetService: BudgetService
  ) {
    // Inicializar budgetData$ en el constructor
    this.budgetData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id')!;
        return this.budgetService.getBudget(id).pipe(
          map((budget) => ({
            budget,
            requiredBoxes: this.budgetService.calculateRequiredBoxes(
              budget.modules
            ),
            groupedModules: this.budgetService.groupModulesByZone(
              budget.modules
            ),
            total: this.budgetService.calculateTotal(budget.modules),
          }))
        );
      })
    );
  }

  getZones(groupedModules: GroupedModules): string[] {
    return Object.keys(groupedModules);
  }
}
