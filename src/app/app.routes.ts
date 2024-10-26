import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'budgets',
    pathMatch: 'full',
  },
  {
    path: 'budgets',
    loadComponent: () =>
      import('./budget-list/budget-list.component').then(
        (m) => m.BudgetListComponent
      ),
  },
  {
    path: 'budgets/new',
    loadComponent: () =>
      import('./budget-form/budget-form.component').then(
        (m) => m.BudgetFormComponent
      ),
  },
  {
    path: 'budgets/:id',
    loadComponent: () =>
      import('./budget-view/budget-view.component').then(
        (m) => m.BudgetViewComponent
      ),
  },
];
