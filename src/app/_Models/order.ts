export interface Order {
  id: number;
  totalPrice: number;
  date: Date;
  customerId: number;
  statusId: number;
  paymentId: number;
  shipperId: number;
  sellerId: number;
  shipPrice: number;
}
