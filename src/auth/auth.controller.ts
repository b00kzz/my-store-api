import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './loginDto/loginDto';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('/line/login')
  async lineLogin(@Body() body: LoginDto) {
    return this.authService.validateUserConnect(body.uuid)
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refrshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  // @UseGuards(JwtGuard)
  // @Get('profile/me')
  // async getProfile(@Request() req) {
  //   return this.authService.findUserByToken(req.headers.authorization);
  // }
}
