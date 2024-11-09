import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.dev.local', '.env.dev', '.env'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppConfigModule {}
