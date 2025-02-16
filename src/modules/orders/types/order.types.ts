export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDto {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export interface UpdateOrderDto {
  id: string;
  status?: OrderStatus;
  items?: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}
