import {Address} from './Address'

export class Customer {
  constructor(
    public id: number,
    public name: string,
    public phone: number,
    public Email: string,
    public password: string,
    public address: Address
  ) {}
}
