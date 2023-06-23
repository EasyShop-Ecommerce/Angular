export interface Order {
  Id: number;
  TotalPrice: number;
  Date: Date;
  CustomerId: number;
  StatusId: number;
  PaymentMethodId: number;
  ShipperId: number;
  SellerId: number;
  ShipPrice: number;
}
