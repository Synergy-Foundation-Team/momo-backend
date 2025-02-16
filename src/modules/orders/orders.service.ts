import { Injectable } from '@nestjs/common';
import {
  Order,
  OrderStatus,
  CreateOrderDto,
  UpdateOrderDto,
} from './types/order.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private orders: Map<string, Order> = new Map();

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order: Order = {
      id: uuidv4(),
      userId: createOrderDto.userId,
      items: createOrderDto.items.map((item) => ({
        id: uuidv4(),
        ...item,
      })),
      total: createOrderDto.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      ),
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.set(order.id, order);
    return order;
  }

  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = this.orders.get(updateOrderDto.id);
    if (!order) {
      throw new Error('Order not found');
    }

    const updatedOrder: Order = {
      ...order,
      ...(updateOrderDto.status && { status: updateOrderDto.status }),
      ...(updateOrderDto.items && {
        items: updateOrderDto.items.map((item) => ({
          id: uuidv4(),
          ...item,
        })),
        total: updateOrderDto.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
      }),
      updatedAt: new Date(),
    };

    this.orders.set(order.id, updatedOrder);
    return updatedOrder;
  }

  async makeDeliver(orderId: string): Promise<Order> {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const updatedOrder: Order = {
      ...order,
      status: OrderStatus.DELIVERING,
      updatedAt: new Date(),
    };

    this.orders.set(orderId, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(orderId: string): Promise<void> {
    if (!this.orders.has(orderId)) {
      throw new Error('Order not found');
    }
    this.orders.delete(orderId);
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }
}
