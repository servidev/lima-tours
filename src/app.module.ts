import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TouristPackageModule } from './modules/tourist-package/tourist-package.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envConfig } from './config/env.config';
import { JwtConfigService } from './config/jwt.config';
import { typeOrmConfig } from './config/typeorm.config';
import { IsUniqueConstraint } from './common/validator/is-unique-constraint';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    JwtModule.registerAsync({
      global: true,
      useClass: JwtConfigService,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    TouristPackageModule,
    ReservationModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
