import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  await app.listen(process.env.PORT);
  Logger.log(
    `Server running on http://localhost:${process.env.PORT}`,
    'Bootstrap',
  );
}
bootstrap();
