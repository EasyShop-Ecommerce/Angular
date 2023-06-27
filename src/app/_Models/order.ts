export interface Order {
  id: number;
  totalPrice: number;
  date: Date;
  customerId: number;
  statusId: number;
  paymentMethodId: number;
  sellerId: number;
  shipPrice: number;
}
