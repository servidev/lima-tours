import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;
}
