import { Routes } from '@angular/router';
import { CustomerList } from './features/customers/customer-list/customer-list';
import { CustomerForm } from './features/customers/customer-form/customer-form';


export const routes: Routes = [
    { path: '', redirectTo: 'customers', pathMatch: 'full'},
    { path: 'customers', component: CustomerList},
    { path: 'customers/new', component: CustomerForm},
    { path: 'customers/:id/edit', component: CustomerForm },
];
