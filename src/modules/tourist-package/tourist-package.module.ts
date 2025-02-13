import { Module } from '@nestjs/common';
import { TouristPackageService } from './tourist-package.service';
import { TouristPackageController } from './tourist-package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TouristPackage } from './entities/tourist-package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TouristPackage])],
  controllers: [TouristPackageController],
  providers: [TouristPackageService],
})
export class TouristPackageModule {}
