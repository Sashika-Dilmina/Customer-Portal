import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CustomerApi } from '../../../core/customer-api';
import { Customer } from '../../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.scss',
})

export class CustomerList {
  private readonly api = inject(CustomerApi);

  protected readonly customers = signal<Customer[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    this.load();
  }
  protected load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.api.getAll().subscribe({
      next: (data) => { this.customers.set(data); this.loading.set(false); },
      error: () => { this.error.set('Could not load customers. Is the API running?'); this.loading.set(false); },
    });
  }

    protected remove(customer: Customer): void {
    if (!confirm(`Delete ${customer.customerName}?`)) return;
    this.api.remove(customer.customerId).subscribe({
      next: () => this.customers.update((list) => list.filter((c) => c.customerId !== customer.customerId)),
      error: () => this.error.set('Delete failed.'),
    });
  }
}