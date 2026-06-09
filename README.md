# Customer Portal Frontend

Customer Portal is an Angular 22 frontend application developed as part of the Customer Management System assignment. The application communicates with a .NET Web API backend and provides full CRUD (Create, Read, Update, Delete) functionality for managing customer records.

The application was built using modern Angular features including:

- Standalone Components
- Angular Signals
- Signal Forms
- Zoneless Change Detection
- HttpClient
- Angular Routing
- Lazy Loading
- Client-side Search and Filtering

---

## Features

### Customer List

- View all customers
- Search customers
- Edit customer details
- Delete customers
- Display customer status
- Display customer type

### Customer Form

- Create new customers
- Edit existing customers
- Form validation
- Active / Inactive status management
- Error handling

---

## Technologies Used

### Frontend

- Angular 22
- TypeScript
- SCSS
- Angular Signals
- Signal Forms
- HttpClient
- Angular Router

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server

---

## Project Structure

```text
src/app
│
├── app.ts
├── app.config.ts
├── app.routes.ts
│
├── models
│   └── customer.model.ts
│
├── core
│   └── customer-api.ts
│
└── features
    └── customers
        ├── customer-list
        │   ├── customer-list.ts
        │   ├── customer-list.html
        │   └── customer-list.scss
        │
        └── customer-form
            ├── customer-form.ts
            ├── customer-form.html
            └── customer-form.scss
```

---

## Application Architecture

The application follows a simple layered architecture.

```text
User Interface
      │
      ▼
Angular Components
      │
      ▼
CustomerApi Service
      │
      ▼
ASP.NET Core Web API
      │
      ▼
SQL Server Database
```

### Components

#### CustomerList

Responsible for:

- Displaying all customers
- Searching customers
- Deleting customers

#### CustomerForm

Responsible for:

- Creating customers
- Editing customers
- Form validation

---

## Models

The application uses strongly typed models.

### Customer

Represents a customer returned from the API.

### CustomerCreate

Represents data sent when creating a customer.

### CustomerUpdate

Represents data sent when updating a customer.

### CustomerType

Defines valid customer types:

- Personal
- Business

---

## Routing

The application contains the following routes:

| Route | Description |
|---------|-------------|
| /customers | Customer list page |
| /customers/new | Create customer |
| /customers/:id/edit | Edit customer |

Example:

```text
/customers/5/edit
```

Loads customer with ID 5 for editing.

---

## Angular Signals

Angular Signals are used for reactive state management.

Examples:

```ts
customers = signal<Customer[]>([]);
loading = signal(false);
error = signal<string | null>(null);
```

Benefits:

- Automatic UI updates
- Better performance
- Simpler state management
- Reduced change detection overhead

---

## Signal Forms

Signal Forms are used to manage form state and validation.

Validation Rules:

| Field | Validation |
|---------|------------|
| Customer Name | Required, Max Length 150 |
| Customer Type | Required |
| Date Of Birth | Required |
| Address | Max Length 250 |
| Email | Valid Email Format |

Signal Forms automatically:

- Bind inputs
- Track changes
- Manage validation
- Display errors

---

## Data Service

All API communication is centralized in the CustomerApi service.

Available Methods:

### Get All Customers

```ts
getAll()
```

### Get Customer By Id

```ts
getById(id)
```

### Create Customer

```ts
create(payload)
```

### Update Customer

```ts
update(id, payload)
```

### Delete Customer

```ts
remove(id)
```

This keeps components clean and separates UI logic from API logic.

---

## CRUD Operations

### Create

Users can create new customers using the customer form.

The API automatically generates:

```text
CustomerCode
CreatedDate
```

### Read

All customers are displayed in a table.

### Update

Existing customers can be modified using the edit form.

### Delete

Customers can be removed from the system after confirmation.

---

## Bonus Challenge 1 – Search & Filter

Implemented client-side search using Angular Signals and Computed Signals.

Users can search by:

- Customer Name
- Customer Code
- Email
- Phone Number

Implementation:

```ts
searchTerm = signal('');

filteredCustomers = computed(() => {
    const search = this.searchTerm().toLowerCase();

    return this.customers().filter(c =>
        c.customerName.toLowerCase().includes(search) ||
        c.customerCode.toLowerCase().includes(search)
    );
});
```

Benefits:

- Instant filtering
- No page refresh
- Automatic UI updates

---

## Bonus Challenge 2 – Lazy Loading

Implemented route-based lazy loading using Angular's `loadComponent()` feature.

Example:

```ts
{
    path: 'customers',
    loadComponent: () =>
        import('./features/customers/customer-list/customer-list')
            .then(m => m.CustomerList)
}
```

Benefits:

- Smaller initial bundle size
- Faster application startup
- Better performance

---

## Error Handling

The application handles:

### API Errors

```text
Could not load customers.
Save failed.
Delete failed.
```

### Validation Errors

```text
Customer name is required.
Date of birth is required.
Enter a valid email address.
```

---

## Running the Application

### Start Backend

```bash
dotnet run --project CustomerManagement.API
```

### Start Frontend

```bash
npm install
ng serve
```

### Open Browser

```text
http://localhost:4200
```

---

## Testing

The following functionality was tested:

### Create Customer

- Create customer
- Verify customer code generation

### Read Customers

- Display all customers

### Update Customer

- Edit customer details
- Update active status

### Delete Customer

- Remove customer record

### Validation

- Required field validation
- Email validation

### Search

- Search by customer name
- Search by customer code

---

## Learning Outcomes

Through this project, I gained practical experience in:

- Angular 22
- Angular Signals
- Signal Forms
- Standalone Components
- HttpClient
- REST API Integration
- CRUD Operations
- Routing
- Lazy Loading
- Client-side Filtering
- Form Validation
- State Management

---

## Conclusion

This project demonstrates a modern Angular 22 application integrated with an ASP.NET Core Web API backend. The application successfully implements CRUD functionality, form validation, state management using Signals, API communication through a dedicated service layer, lazy loading, and client-side search functionality while following clean architecture and Angular best practices.
