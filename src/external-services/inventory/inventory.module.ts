import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InventoryService } from './inventory.service';
import { HttpClientService } from '../../common/services/http-client.service';

@Module({
  imports: [ConfigModule],
  providers: [InventoryService, HttpClientService],
  exports: [InventoryService],
})
export class InventoryModule {}
