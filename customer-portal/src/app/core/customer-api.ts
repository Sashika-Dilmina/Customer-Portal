import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, CustomerCreate,CustomerUpdate} from '../models/customer.model';

@Injectable({
  providedIn: 'root'})
export class CustomerApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/customers';

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);

  }

  getById(id: number) : Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

   create(payload: CustomerCreate): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, payload);
  }

  update(id: number, payload: CustomerUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}
