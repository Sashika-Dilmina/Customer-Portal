import { Component, ChangeDetectionStrategy, inject, signal, computed, input, effect } from '@angular/core';
import { Router } from '@angular/router';
import { form, required, maxLength, email, FormField } from '@angular/forms/signals';
import { CustomerApi } from '../../../core/customer-api';
import { CustomerType, CUSTOMER_TYPES, CustomerCreate } from '../../../models/customer.model';



interface CustomerFormModel {
  customerName: string;
  address: string;
  dateOfBirth: string;
  customerType: CustomerType;
  email: string;
  phoneNumber: string;
  isActive: boolean;
}

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormField],
  templateUrl: './customer-form.html',
  styleUrls: ['./customer-form.scss']
})

export class CustomerForm {

  readonly id = input<string>();

  private readonly api = inject(CustomerApi);
  private readonly router = inject(Router);

  protected readonly customerTypes = CUSTOMER_TYPES;
  protected readonly saving = signal(false);
  protected serverError = signal<string | null>(null);

  protected readonly isEdit = computed(() => !!this.id());
  protected readonly model = signal<CustomerFormModel>(this.emptyModel());

  protected readonly customerForm = form(this.model, (path) => {
    required(path.customerName, { message: 'Customer name is required.'});
    maxLength(path.customerName, 150);
    required(path.dateOfBirth, { message: 'Date of birth is required.'});
    required(path.customerType);
    maxLength(path.address, 250);
    email(path.email, { message: 'Enter a valid email address.'});
    
  });

    constructor() {
    
    effect(() => {
      const id = this.id();
      if (!id) return;
      this.api.getById(Number(id)).subscribe((c) => {
        this.model.set({
          customerName: c.customerName,
          address: c.address ?? '',
          dateOfBirth: c.dateOfBirth?.substring(0, 10) ?? '',
          customerType: c.customerType,
          email: c.email ?? '',
          phoneNumber: c.phoneNumber ?? '',
          isActive: c.isActive,
        });
      });
    });
  }

  protected save(): void {
    if (this.customerForm().invalid()){
      this.customerForm().markAsTouched();
      return;
    }
    this.saving.set(true);
    this.serverError.set(null);

    const v = this.model();
    const payload: CustomerCreate = {
    customerName: v.customerName,
    address: v.address || null,
    dateOfBirth: v.dateOfBirth,
    customerType: v.customerType,
    email: v.email || null,
    phoneNumber: v.phoneNumber || null
  };
    if (this.isEdit()) {
    this.api.update(Number(this.id()), {
      ...payload,
      isActive: v.isActive
    }).subscribe({
      next: () => this.router.navigate(['/customers']),
      error: () => {
        this.serverError.set('Save failed. Check the API and try again.');
        this.saving.set(false);
      }
    });
  } else {
    this.api.create(payload).subscribe({
      next: () => this.router.navigate(['/customers']),
      error: () => {
        this.serverError.set('Save failed. Check the API and try again.');
        this.saving.set(false);
      }
    });
  }
  }

  protected cancel(): void {
    this.router.navigate(['/customers']);
  }

  private emptyModel(): CustomerFormModel {
    return {
      customerName: '', address: '', dateOfBirth: '',
      customerType: 'Personal', email: '', phoneNumber: '', isActive: true,
    };
  }
}
