import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AppConfigModule, ProductsModule, UsersModule, OrdersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
