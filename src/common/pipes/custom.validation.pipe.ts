import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const customErrors = errors.map((error) => ({
          field: error.property,
          message: error.constraints
            ? error.constraints[Object.keys(error.constraints)[0]]
            : 'Validation error',
        }));

        return new BadRequestException({
          errors: customErrors,
        });
      },
      transform: true,
      stopAtFirstError: true,
      transformOptions: {
        //! MANEJO DE TIPOS CON DTO - TRANSFORM
        enableImplicitConversion: false,
      },
    });
  }
}
