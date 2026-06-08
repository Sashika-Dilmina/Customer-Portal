export type CustomerType = 'Personal' | 'Business' ;

export const CUSTOMER_TYPES: readonly CustomerType[] = ['Personal', 'Business'] as const;

export interface Customer {
    customerId: number;
    customerCode: string;
    customerName: string;
    address: string | null;
    dateOfBirth: string;
    customerType: CustomerType;
    customerTypeName: string;
    email: string | null;
    phoneNumber: string | null;
    isActive: boolean;
    createdDate: string;

}

export interface CustomerCreate {
    customerName: string;
    address: string | null;
    dateOfBirth: string;
    customerType: CustomerType;
    email: string | null;
    phoneNumber: string | null;
}

export interface CustomerUpdate extends CustomerCreate{
    isActive: boolean;
}