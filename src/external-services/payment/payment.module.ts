import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentService } from './payment.service';
import { HttpClientService } from '../../common/services/http-client.service';

@Module({
  imports: [ConfigModule],
  providers: [PaymentService, HttpClientService],
  exports: [PaymentService],
})
export class PaymentModule {}
