import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from './constants/jwt.constant';

@Module({
  imports: [
    
    JwtModule.register({
      global: true,
      secret:JWT_SECRET.secret,
      signOptions: { expiresIn: '24h' },
    }),
    
    TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
