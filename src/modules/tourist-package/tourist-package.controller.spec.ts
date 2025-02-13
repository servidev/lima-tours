import { Test, TestingModule } from '@nestjs/testing';
import { TouristPackageController } from './tourist-package.controller';
import { TouristPackageService } from './tourist-package.service';

describe('TouristPackageController', () => {
  let controller: TouristPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristPackageController],
      providers: [TouristPackageService],
    }).compile();

    controller = module.get<TouristPackageController>(TouristPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
