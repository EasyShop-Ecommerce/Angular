import { Address } from './Address';
import { User } from './Login';

export class Customer implements User {
  id: number;
  name: string;
  phone: string;
  email: string;
  password: string;
  street: string;
  city:string;
  government:string;
  
  constructor(id:number,name:string,phone:string,email:string,government:string,city:string,street:string,password:string)
   {
    this.id=id
    this.name=name
    this.email=email
    this.phone=phone
    this.password=password
    this.street=street
    this.city=city
    this.government=government
  }
}
