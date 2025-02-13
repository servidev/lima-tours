import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { IsUnique } from 'src/common/decorators/is-unique.decorator';

export class CreateTouristPackageDto {
  @IsNotEmpty({ message: 'Requerido' })
  @IsUnique(
    { tableName: 'tourist_packages', column: 'name' },
    { message: 'Ya existe el paquete' },
  )
  name: string;

  @IsNumber({}, { message: 'No válido' })
  @IsPositive({ message: 'Debe ser positivo' })
  @IsNotEmpty({ message: 'Requerido' })
  price: number;

  @IsNumber({}, { message: 'No válido' })
  @IsPositive({ message: 'Debe ser positivo' })
  @IsNotEmpty({ message: 'Requerido' })
  duration: number;

  @IsNotEmpty({ message: 'Requerida' })
  description: string;

  @IsNumber({}, { message: 'No válido' })
  @IsPositive({ message: 'Debe ser positivo' })
  @IsNotEmpty({ message: 'Requerido' })
  availability: number;
}
