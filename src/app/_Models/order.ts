export interface Order {
  id?: number;
  totalPrice: number;
  date: Date;
  customerId: number;
  statusId: number;
  paymentMethodId: number;
  sellerId: number;
  shipPrice: number;
  unitPrice:number;
  quantity:number;
  productId:number
}
