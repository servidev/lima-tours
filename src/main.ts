import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomValidationPipe } from './common/pipes/custom.validation.pipe';
import { useContainer } from 'class-validator';
import { envConfig } from './config/env.config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/winston/winston-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const configEnv = envConfig();

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new CustomValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: configEnv.CORS_ORIGIN?.split(','),
    methods: configEnv.CORS_METHODS,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API de Reservaciones de Tours')
    .setDescription(
      'Esta API permite gestionar clientes y realizar reservaciones para diferentes tours. ' +
        'Incluye endpoints para registrar nuevos clientes y gestionar la reserva de tours de manera eficiente.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(configEnv.API_PORT);
}
bootstrap();
