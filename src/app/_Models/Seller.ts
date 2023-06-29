import { Address } from './Address';
import { User } from './Login';

export class Seller implements User {
  id: number;
  name: string;
  middleName: string;
  lastName: string;
  sSN: string;
  phone: string;
  businessName: string;
  password: string;
  email: string;
  address: Address;

  constructor(id:number,name:string,middleName:string,lastName:string,businessName:string,sSN:string,phone:string,email:string,address:Address,password:string)
   {
    this.id=id
    this.name=name
    this.middleName=middleName
    this.lastName=lastName
    this.address=address
    this.email=email
    this.businessName=businessName
    this.sSN=sSN
    this.phone=phone
    this.password=password
  }
}
