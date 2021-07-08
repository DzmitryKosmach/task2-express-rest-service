import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  //@UseGuards(LocalAuthGuard)
  //@HttpCode(HttpStatus.OK)
  login(@Body() userLoginDto: UserLoginDto) {
    //const result = this.authService.validateUser(
    //  userLoginDto.login,
    //  userLoginDto.password,
    //);

    const result = this.authService.login(
      userLoginDto.login,
      userLoginDto.password,
    );
    if (result) return result;
    throw new NotFoundException();
  }
}
