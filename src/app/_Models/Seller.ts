import { Address } from './Address';
export interface Seller {
  Id: number;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  SSN: number;
  Phone: number;
  BusinessName: string;
  Email: string;
  address: Address;
}
