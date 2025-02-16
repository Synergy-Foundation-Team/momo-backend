import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8000',
      'http://localhost:3001',
      'http://localhost:8080',
    ],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  setupSwagger(app);

  await app.listen(process.env.PORT);
  Logger.log(
    `Server running on http://localhost:${process.env.PORT}/api`,
    'Bootstrap',
  );
}
bootstrap();
