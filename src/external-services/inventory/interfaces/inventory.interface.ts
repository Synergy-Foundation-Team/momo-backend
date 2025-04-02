export interface StockUpdateRequest {
  productId: string;
  quantity: number;
  warehouseId?: string;
  orderId: string;
}

export interface StockUpdateResponse {
  productId: string;
  updatedQuantity: number;
  status: 'success' | 'insufficient_stock' | 'error';
  message?: string;
  timestamp: string;
}

export interface StockCheckRequest {
  productId: string;
  quantity: number;
  warehouseId?: string;
}

export interface StockCheckResponse {
  productId: string;
  available: boolean;
  currentStock: number;
  timestamp: string;
}
