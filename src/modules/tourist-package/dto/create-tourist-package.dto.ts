import { IsNotEmpty, IsNumber, IsPositive, Length } from 'class-validator';
import { IsUnique } from '@/common/decorators/is-unique.decorator';

export class CreateTouristPackageDto {
  @IsNotEmpty({ message: 'Requerido' })
  @IsUnique(
    { tableName: 'tourist_packages', column: 'nombre' },
    { message: 'Ya existe el paquete' },
  )
  nombre: string;

  @IsNumber({}, { message: 'No válido' })
  @IsPositive({ message: 'Debe ser positivo' })
  @IsNotEmpty({ message: 'Requerido' })
  precio: number;

  @IsNumber({}, { message: 'No válido' })
  @IsPositive({ message: 'Debe ser positivo' })
  @IsNotEmpty({ message: 'Requerido' })
  duracion: number;

  @IsNotEmpty({ message: 'Requerida' })
  @Length(10, 100, { message: 'Debe tener entre 10 y 100 caracteres' })
  descripcion: string = '';

  @IsNumber({}, { message: 'No válido' })
  @IsPositive({ message: 'Debe ser positivo' })
  @IsNotEmpty({ message: 'Requerido' })
  disponibilidad: number;
}
