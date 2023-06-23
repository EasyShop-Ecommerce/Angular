import { Address } from './Address';

export interface Customer {
  id: number;
  name: string;
  phone: number;
  email: string;
  password: string;
  address: Address;
}
