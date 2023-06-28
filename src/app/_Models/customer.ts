import { Address } from './Address';

export interface Customer {
  id: number;
  name: string;
  phone: number;
  email: string;
  password: string;
  street: string;
  city: string;
  government: string;
}
