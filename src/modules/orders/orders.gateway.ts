import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, Injectable } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './types/order.types';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*', // In production, replace with your actual frontend origin
  },
})
export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(OrdersGateway.name);

  constructor(private readonly ordersService: OrdersService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createOrder')
  async handleCreateOrder(@MessageBody() createOrderDto: CreateOrderDto) {
    try {
      const order = await this.ordersService.createOrder(createOrderDto);
      this.server.emit('orderCreated', order);
      return { success: true, data: order };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('updateOrder')
  async handleUpdateOrder(@MessageBody() updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.ordersService.updateOrder(updateOrderDto);
      this.server.emit('orderUpdated', order);
      return { success: true, data: order };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('makeDeliver')
  async handleMakeDeliver(@MessageBody() { orderId }: { orderId: string }) {
    try {
      const order = await this.ordersService.makeDeliver(orderId);
      this.server.emit('orderDelivering', order);
      return { success: true, data: order };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('deleteOrder')
  async handleDeleteOrder(@MessageBody() { orderId }: { orderId: string }) {
    try {
      await this.ordersService.deleteOrder(orderId);
      this.server.emit('orderDeleted', { orderId });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
