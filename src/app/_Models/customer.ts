export interface Address {
  street: string;
  city: string;
  government: string;
}

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
