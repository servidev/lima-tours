import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: loginAuthDto.email },
      });

      if (!user || !bcrypt.compareSync(loginAuthDto.password, user.password)) {
        throw new UnauthorizedException('Email o contraseña incorrecto');
      }

      const payload = { role: user.role };
      const token = await this.jwtService.signAsync(payload);

      return { role: user.role, token };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      this.logger.error(`DB Conflict Error: ${error.detail}`);
      throw new BadRequestException(error.detail);
    }

    this.logger.error(`Unexpected DB Error: ${error.message}`, error.stack);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
