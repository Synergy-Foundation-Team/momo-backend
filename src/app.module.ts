import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ModulesModule } from './modules/modules.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 30,
    }),
    AppConfigModule,
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
