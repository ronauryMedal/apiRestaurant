import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/auth.entity';
import * as bcript from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


  constructor(

    @InjectRepository(Users) private authRepository: Repository<Users>,
    private readonly jwtService: JwtService

  ) {
  }
 async create( registerDto: RegisterDto) {

    try {
      const {username,email,password}=registerDto;
      const user =await this.authRepository.findOneBy({email});
      if (!user) {

        const newUser = this.authRepository.create({

          username,
          email,
          password: bcript.hashSync(password, 10),
        });
        await this.authRepository.save(newUser);
 
      }else{
        throw new BadRequestException('El usuario ya existe');
      }
      
    } catch (error) {
      
      throw error;
    }

    return "user created";
  }


  async login(loginDto: LoginDto) {

    const {email,password}=loginDto;
    const user =await this.authRepository.findOneBy({email});
    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }
    if (!bcript.compareSync(password, user.password)) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    const payload = {email: user.email, roles: user.role};

    const token = await this.jwtService.signAsync(payload);
    return {
      email: user.email,
      username: user.username,
      token: token
    };
  }
 /*  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  } */
}
