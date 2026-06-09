import { Component, ChangeDetectionStrategy, inject, signal, computed, input, effect } from '@angular/core';
import { Router } from '@angular/router';
import { form, required, maxLength, email, FormField } from '@angular/forms/signals';
import { CustomerApi } from '../../../core/customer-api';
import { CustomerType, CUSTOMER_TYPES, CustomerCreate } from '../../../models/customer.model';

// The editable shape (strings, never null — easier to bind to inputs).
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
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customer-form.html',
  styleUrl: './customer-form.scss',
})
export class CustomerForm {
  // Route param ":id" is bound straight into this input.
  readonly id = input<string>();

  private readonly api = inject(CustomerApi);
  private readonly router = inject(Router);

  protected readonly customerTypes = CUSTOMER_TYPES;
  protected readonly saving = signal(false);
  protected readonly serverError = signal<string | null>(null);

  protected readonly isEdit = computed(() => !!this.id());

  // The form model is a writable signal...
  protected readonly model = signal<CustomerFormModel>(this.emptyModel());

  // ...and the form wraps it with a validation schema.
  protected readonly customerForm = form(this.model, (path) => {
    required(path.customerName, { message: 'Customer name is required.' });
    maxLength(path.customerName, 150);
    required(path.dateOfBirth, { message: 'Date of birth is required.' });
    required(path.customerType);
    maxLength(path.address, 250);
    email(path.email, { message: 'Enter a valid email address.' });
  });

  constructor() {
    // When an id is present (edit mode), load the record into the model.
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
    // Reading the root field's state gives validity as a signal.
    if (this.customerForm().invalid()) {
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
      phoneNumber: v.phoneNumber || null,
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