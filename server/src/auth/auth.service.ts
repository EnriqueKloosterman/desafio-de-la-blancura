import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
    ) {}

  async register({ user_name, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('Email already registered');
    }
    await this.userService.create({
      user_name,
      email,
      password: await bcryptjs.hash(password, 10),
    });
    return {
      user_name,
      email,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findEmailWithPassword(email);
    if (!user){
        throw new BadRequestException('Wrong email');
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
        throw new BadRequestException('Wrong password');
    }
    const payload = { email: user.email, user_name: user.user_name  };
    const token = await this.jwtService.signAsync(payload)

    return {
      user_name: user.user_name,
      email: user.email,
      token: token,
    };
  }

  async profile( {user_name, email, password}: {user_name: string, email: string, password: string}){
    return await this.userService.findOneByEmail(email);
  }



}
