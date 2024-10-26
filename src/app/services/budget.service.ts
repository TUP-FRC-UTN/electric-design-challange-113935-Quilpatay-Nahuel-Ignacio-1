import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Budget, ModuleType } from '../models/budget';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/budgets`).pipe(
      catchError((error) => {
        console.error('Error fetching budgets:', error);
        return throwError(() => error);
      })
    );
  }

  getBudget(id: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/budgets/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching budget:', error);
        return throwError(() => error);
      })
    );
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.apiUrl}/budgets`, budget).pipe(
      catchError((error) => {
        console.error('Error creating budget:', error);
        return throwError(() => error);
      })
    );
  }

  getModuleTypes(): Observable<ModuleType[]> {
    return this.http.get<ModuleType[]>(`${this.apiUrl}/module-types`).pipe(
      catchError((error) => {
        console.error('Error fetching module types:', error);
        return throwError(() => error);
      })
    );
  }

  // Helper method to calculate required boxes
  calculateRequiredBoxes(modules: Budget['modules']): number {
    const totalSlots = modules.reduce(
      (acc, module) => acc + module.moduleType.slots,
      0
    );
    return Math.ceil(totalSlots / 3); // Each box has 3 slots
  }

  // Helper method to group modules by zone
  groupModulesByZone(modules: Budget['modules']): Record<string, any> {
    return modules.reduce((acc, curr) => {
      const zone = curr.zone;
      if (!acc[zone]) {
        acc[zone] = { modules: [] };
      }
      acc[zone].modules.push({
        name: curr.moduleType.name,
        price: curr.moduleType.price,
        slots: curr.moduleType.slots,
      });
      return acc;
    }, {} as Record<string, any>);
  }

  // Calculate total budget
  calculateTotal(modules: Budget['modules']): number {
    return modules.reduce((acc, module) => acc + module.moduleType.price, 0);
  }
}
