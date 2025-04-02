export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  customerId: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: 'success' | 'failed' | 'pending';
  message?: string;
  timestamp: string;
}
