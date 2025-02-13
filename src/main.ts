import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipes/custom.validation.pipe';
import { useContainer } from 'class-validator';
import { envConfig } from './config/env.config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/winston/winston-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const config = envConfig();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new CustomValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: config.CORS_ORIGIN?.split(','),
    methods: config.CORS_METHODS,
  });

  await app.listen(config.API_PORT);
}
bootstrap();
