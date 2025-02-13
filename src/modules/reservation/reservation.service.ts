import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { pagination } from 'src/common/utils/pagination';
import { TouristPackageService } from '../tourist-package/tourist-package.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class ReservationService {
  private readonly logger = new Logger('ReservationService');

  constructor(
    @InjectRepository(Reservation)
    private readonly reservation: Repository<Reservation>,

    private readonly touristPackageService: TouristPackageService,
    private readonly mailService: MailService,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    try {
      const touristPackage = await this.touristPackageService.findOne({
        id: createReservationDto.touristPackageId,
      });

      const newReservation = this.reservation.create({
        touristPackage,
        ...createReservationDto,
      });

      const reservation = await this.reservation.save(newReservation);

      const body = {
        to: reservation.email,
        subject: 'Reserva creada',
        text: `Tu reserva para ${touristPackage.nombre} ha sido creada.`,
        html: `Tu reserva para ${touristPackage.nombre} ha sido creada.`,
      };

      await this.mailService.sendMail(
        body.to,
        body.subject,
        body.text,
        body.html,
      );

      return reservation;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [reservations, count] = await this.reservation.findAndCount({
      skip,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    return pagination(page, limit, reservations, count);
  }

  async findOne(
    conditions: FindOptionsWhere<Reservation>,
  ): Promise<Reservation> {
    const reservations = await this.reservation.findOne({
      where: conditions,
    });

    if (!reservations) {
      throw new NotFoundException(
        `reservations with conditions ${JSON.stringify(conditions)} not found`,
      );
    }
    return reservations;
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    try {
      const touristPackage = await this.touristPackageService.findOne({
        id: updateReservationDto.touristPackageId,
      });

      const reservation = await this.findOne({ id: id });

      if (!reservation) {
        throw new NotFoundException(`reservations  not found`);
      }

      const loadReservation = await this.reservation.preload({
        id,
        touristPackage,
        ...updateReservationDto,
      });
      return await this.reservation.save(loadReservation);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: number): Promise<Reservation> {
    const existingReservation = await this.findOne({ id });
    return await this.reservation.softRemove(existingReservation);
  }

  async search(term: string): Promise<Reservation[] | null> {
    return await this.reservation.find({
      relations: { touristPackage: true },
      where: {
        cliente_nombre: Like(`%${term}%`),
      },
    });
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
