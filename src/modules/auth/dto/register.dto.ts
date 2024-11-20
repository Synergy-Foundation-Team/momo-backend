import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'Username for registration'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password (minimum 6 characters)'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
