import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto) {
    // Check if username already exists
    const existingUsername = await this.usersService.findByUsername(registerDto.username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.usersService.findByEmail(registerDto.email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
    });
    
    const { password, ...result } = user;
    return {
      success: true,
      data: result,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      username: user.username,
      email: user.email
    };

    return {
      success: true,
      data: {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        }
      }
    };
  }
}
