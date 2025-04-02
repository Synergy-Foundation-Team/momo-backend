import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../common/services/http-client.service';
import {
  PaymentRequest,
  PaymentResponse,
} from './interfaces/payment.interface';

@Injectable()
export class PaymentService {
  private readonly baseUrl: string;
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    private readonly httpClient: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('PAYMENT_API_URL');
  }

  async createPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      return await this.httpClient.post<PaymentResponse>(
        `${this.baseUrl}/payments`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${this.configService.get('PAYMENT_API_KEY')}`,
          },
        },
      );
    } catch (error) {
      // Handle specific error cases
      throw error;
    }
  }

  async getPaymentStatus(transactionId: string): Promise<PaymentResponse> {
    try {
      return await this.httpClient.get<PaymentResponse>(
        `${this.baseUrl}/payments/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${this.configService.get('PAYMENT_API_KEY')}`,
          },
        },
      );
    } catch (error) {
      // Handle specific error cases
      throw error;
    }
  }
}
