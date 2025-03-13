import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' }, // Redirect empty 'auth/' to 'auth/login'
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee-form', component: EmployeeFormComponent },
  { path: 'employee-form/:id', component: EmployeeFormComponent },
  { path: '**', redirectTo: 'employees' } // Handle unknown routes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
