export interface User {
  email: string;
  password: string;
  name: string;
}

export class Login implements User {
  customerId: number;
  email: string;
  password: string;
  token: string;
  expiration: Date;
  name: string;

  constructor(
    customerId: number,
    email: string,
    password: string,
    token: string,
    expiration: Date,
    name: string
  ) {
    this.expiration = expiration;
    this.token = token;
    this.email = email;
    this.password = password;
    this.name = name;
    this.customerId = customerId;
  }
}
