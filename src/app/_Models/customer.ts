import { Address } from './Address';
import { User } from './Login';

export class Customer implements User {
  id: number;
  name: string;
  phone: number;
  email: string;
  password: string;
  address: Address;
  
  constructor(id:number,name:string,phone:number,email:string,address:Address,password:string)
   {
    this.id=id
    this.name=name
    this.address=address
    this.email=email
    this.phone=phone
    this.password=password
  }
}
