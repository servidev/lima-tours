import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty({ message: 'Requerido' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Requerido' })
  password: string;
}
