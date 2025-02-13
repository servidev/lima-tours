import { Test, TestingModule } from '@nestjs/testing';
import { TouristPackageService } from './tourist-package.service';

describe('TouristPackageService', () => {
  let service: TouristPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristPackageService],
    }).compile();

    service = module.get<TouristPackageService>(TouristPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
