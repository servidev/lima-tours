import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Length } from 'class-validator';
import { parse } from 'date-fns';

export class CreateReservationDto {
  @IsNotEmpty({ message: 'Requerido' })
  @Length(5)
  cliente_nombre: string;

  @IsNotEmpty({ message: 'Requerido' })
  email: string;

  @IsNotEmpty({ message: 'Requerido' })
  @Length(9, 9, { message: 'Mínimo 9 caracteres' })
  telefono: string;

  @IsNotEmpty({ message: 'Requerido' })
  //! VÁLIDO Y CONVIERTO LA FECHA DE STRING A DATE EN FORMATO ACEPTADO PARA LA DB
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return parse(value, 'dd-MM-yyyy', new Date());
    }
    return value;
  })
  fecha_reserva: Date;

  @IsNotEmpty({ message: 'Requerido' })
  @IsInt()
  touristPackageId: number;
}
