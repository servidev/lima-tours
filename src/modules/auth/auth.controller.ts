import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  async loginUser(@Body() loginAuthDto: LoginAuthDto) {
    const { role, token } = await this.authService.login(loginAuthDto);

    return {
      success: true,
      role,
      token,
    };
  }
}
