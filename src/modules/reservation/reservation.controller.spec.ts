import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/guard/auth.guard';
import { parse } from 'date-fns';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  const mockReservationService = {
    create: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
    findAll: jest
      .fn()
      .mockResolvedValue([{ id: 1, cliente_nombre: 'Juan Pérez' }]),
    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    remove: jest.fn().mockResolvedValue({ id: 1 }),
    search: jest
      .fn()
      .mockResolvedValue([{ id: 1, cliente_nombre: 'Juan Pérez' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: mockReservationService,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked-jwt-token'),
            verify: jest.fn().mockReturnValue({ userId: 1 }),
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

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a reservation', async () => {
    const dto: CreateReservationDto = {
      cliente_nombre: 'Juan Pérez',
      email: 'juan@mail.com',
      telefono: '987654321',
      fecha_reserva: parse('12-02-2025', 'dd-MM-yyyy', new Date()),
      touristPackageId: 1,
    };
    expect(await controller.create(dto)).toEqual({
      success: true,
      result: { id: 1, ...dto },
    });
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all reservations', async () => {
    expect(await controller.findAll('1', '10')).toEqual({
      success: true,
      result: [{ id: 1, cliente_nombre: 'Juan Pérez' }],
    });
    expect(service.findAll).toHaveBeenCalledWith(1, 10);
  });

  it('should update a reservation', async () => {
    const dto: UpdateReservationDto = {
      id: 1,
      cliente_nombre: 'Juan Smith',
      email: 'juan_smith@mail.com',
      telefono: '987654321',
      fecha_reserva: parse('15-02-2025', 'dd-MM-yyyy', new Date()),
      touristPackageId: 2,
    };
    expect(await controller.update(1, dto)).toEqual({
      success: true,
      result: { id: 1, ...dto },
    });
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('should remove a reservation', async () => {
    expect(await controller.remove(1)).toEqual({
      success: true,
      dataRemove: { id: 1 },
    });
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should search for reservations', async () => {
    expect(await controller.search('Juan')).toEqual({
      success: true,
      result: [{ id: 1, cliente_nombre: 'Juan Pérez' }],
    });
    expect(service.search).toHaveBeenCalledWith('Juan');
  });
});
