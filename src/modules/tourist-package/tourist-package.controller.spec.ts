import { Test, TestingModule } from '@nestjs/testing';
import { TouristPackageController } from './tourist-package.controller';
import { TouristPackageService } from './tourist-package.service';
import { CreateTouristPackageDto } from './dto/create-tourist-package.dto';
import { UpdateTouristPackageDto } from './dto/update-tourist-package.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/guard/auth.guard';

describe('TouristPackageController', () => {
  let controller: TouristPackageController;
  let service: TouristPackageService;

  const mockTouristPackageService = {
    create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
    findAll: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Package 1' }]),
    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
    search: jest.fn().mockResolvedValue([{ id: 1, nombre: 'Package 1' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristPackageController],
      providers: [
        {
          provide: TouristPackageService,
          useValue: mockTouristPackageService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
            verify: jest.fn().mockImplementation(() => ({
              userId: 1,
              username: 'testUser',
            })),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mocked-config-value'),
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<TouristPackageController>(TouristPackageController);
    service = module.get<TouristPackageService>(TouristPackageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a tourist package', async () => {
    const dto: CreateTouristPackageDto = {
      nombre: 'Mi nuevo paquete',
      precio: 100,
      duracion: 3,
      descripcion: 'Descripción del paquete turístico',
      disponibilidad: 10,
    };
    expect(await controller.create(dto)).toEqual({
      success: true,
      result: { id: 1, ...dto },
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all tourist packages', async () => {
    expect(await controller.findAll('1', '10')).toEqual({
      success: true,
      result: [{ id: 1, nombre: 'Package 1' }],
    });
    expect(service.findAll).toHaveBeenCalledWith(1, 10);
  });

  it('should update a tourist package', async () => {
    const dto: UpdateTouristPackageDto = {
      id: 1,
      nombre: 'Mi paquete actualizado',
      precio: 150,
      duracion: 5,
      descripcion: 'Nueva descripción',
      disponibilidad: 5,
    };
    expect(await controller.update(1, dto)).toEqual({
      success: true,
      result: { id: 1, ...dto },
    });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove a tourist package', async () => {
    expect(await controller.remove(1)).toEqual({
      success: true,
      dataRemove: { id: 1 },
    });
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should search for tourist packages', async () => {
    expect(await controller.search('Package')).toEqual({
      success: true,
      result: [{ id: 1, nombre: 'Package 1' }],
    });
    expect(service.search).toHaveBeenCalledWith('Package');
  });
});
