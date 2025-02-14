import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { IsUnique } from '@/common/decorators/is-unique.decorator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Requerido' })
  @Length(2, 60, { message: 'Mínimo 6 caracteres' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Requerido' })
  @IsUnique({ tableName: 'users', column: 'email' }, { message: 'Ya existe' })
  email: string;

  @IsNotEmpty({ message: 'Requerido' })
  @Length(7, 60, { message: 'Mínimo 7 caracteres' })
  password: string;

  @IsOptional()
  role: string;
}
