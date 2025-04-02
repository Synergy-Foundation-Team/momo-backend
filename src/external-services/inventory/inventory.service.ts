import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../../common/services/http-client.service';
import {
  StockUpdateRequest,
  StockUpdateResponse,
  StockCheckRequest,
  StockCheckResponse,
} from './interfaces/inventory.interface';

@Injectable()
export class InventoryService {
  private readonly baseUrl: string;
  private readonly logger = new Logger(InventoryService.name);

  constructor(
    private readonly httpClient: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('INVENTORY_API_URL');
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.configService.get('INVENTORY_API_KEY')}`,
    };
  }

  async updateStock(
    updateData: StockUpdateRequest,
  ): Promise<StockUpdateResponse> {
    try {
      this.logger.debug(`Updating stock for product ${updateData.productId}`);

      return await this.httpClient.post<StockUpdateResponse>(
        `${this.baseUrl}/inventory/stock/update`,
        updateData,
        { headers: this.getHeaders() },
      );
    } catch (error) {
      this.logger.error(
        `Failed to update stock for product ${updateData.productId}`,
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async checkStock(checkData: StockCheckRequest): Promise<StockCheckResponse> {
    try {
      this.logger.debug(`Checking stock for product ${checkData.productId}`);

      return await this.httpClient.post<StockCheckResponse>(
        `${this.baseUrl}/inventory/stock/check`,
        checkData,
        { headers: this.getHeaders() },
      );
    } catch (error) {
      this.logger.error(
        `Failed to check stock for product ${checkData.productId}`,
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async reserveStock(
    updateData: StockUpdateRequest,
  ): Promise<StockUpdateResponse> {
    try {
      this.logger.debug(`Reserving stock for order ${updateData.orderId}`);

      return await this.httpClient.post<StockUpdateResponse>(
        `${this.baseUrl}/inventory/stock/reserve`,
        updateData,
        { headers: this.getHeaders() },
      );
    } catch (error) {
      this.logger.error(
        `Failed to reserve stock for order ${updateData.orderId}`,
        error.response?.data || error.message,
      );
      throw error;
    }
  }

  async releaseStock(
    updateData: StockUpdateRequest,
  ): Promise<StockUpdateResponse> {
    try {
      this.logger.debug(`Releasing stock for order ${updateData.orderId}`);

      return await this.httpClient.post<StockUpdateResponse>(
        `${this.baseUrl}/inventory/stock/release`,
        updateData,
        { headers: this.getHeaders() },
      );
    } catch (error) {
      this.logger.error(
        `Failed to release stock for order ${updateData.orderId}`,
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
