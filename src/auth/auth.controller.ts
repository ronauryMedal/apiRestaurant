import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  Register(@Body() registerDto: RegisterDto) {
    return this.authService.create(registerDto);
  }

  @Post("login")
  login(@Body()  login: LoginDto) {
    return this.authService.login(login);
  }

 
}
