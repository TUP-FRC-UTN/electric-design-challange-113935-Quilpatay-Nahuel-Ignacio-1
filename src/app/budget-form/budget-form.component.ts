import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetService } from '../services/budget.service';
import { ModuleType, Zone } from '../models/budget';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget-form.component.html',
})
export class BudgetFormComponent {
  budgetForm: FormGroup;
  moduleTypes: ModuleType[] = [];
  zones = Object.values(Zone);

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private router: Router
  ) {
    this.budgetForm = this.fb.group({
      client: ['', Validators.required],
      date: ['', [Validators.required, this.futureDateValidator]],
      modules: this.fb.array([], Validators.minLength(5)),
    });
  }

  ngOnInit(): void {
    this.budgetService.getModuleTypes().subscribe((types) => {
      this.moduleTypes = types;
    });
  }

  get modules() {
    return this.budgetForm.get('modules') as FormArray;
  }

  addModule() {
    const moduleForm = this.fb.group({
      moduleType: [null, Validators.required],
      zone: ['', Validators.required],
    });

    this.modules.push(moduleForm);
  }

  removeModule(index: number) {
    this.modules.removeAt(index);
  }

  onModuleTypeChange(index: number) {
    const moduleForm = this.modules.at(index);
    const selectedType = moduleForm.get('moduleType')?.value;
  }

  getModulePrice(index: number): number {
    const moduleForm = this.modules.at(index);
    const moduleType = moduleForm.get('moduleType')?.value;
    return moduleType?.price || 0;
  }

  getModuleSlots(index: number): number {
    const moduleForm = this.modules.at(index);
    const moduleType = moduleForm.get('moduleType')?.value;
    return moduleType?.slots || 0;
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today ? { futureDate: true } : null;
  }

  onSubmit() {
    if (this.budgetForm.valid && this.modules.length >= 5) {
      const budget = {
        ...this.budgetForm.value,
        date: new Date(this.budgetForm.value.date),
      };

      this.budgetService.createBudget(budget).subscribe({
        next: () => this.router.navigate(['/budgets']),
        error: (error) => console.error('Error creating budget:', error),
      });
    }
  }
}
