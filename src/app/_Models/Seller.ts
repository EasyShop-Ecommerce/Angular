import { Address } from './Address';
export interface Seller {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  sSN: string;
  phone: string;
  businessName: string;
  email: string;
  address: Address;
}
