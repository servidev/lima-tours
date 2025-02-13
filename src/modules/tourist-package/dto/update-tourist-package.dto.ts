import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristPackageDto } from './create-tourist-package.dto';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class UpdateTouristPackageDto extends PartialType(
  CreateTouristPackageDto,
) {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number;
}
