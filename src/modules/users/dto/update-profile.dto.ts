import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user'
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: '+66123456789',
    description: 'Phone number'
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'Bangkok, Thailand',
    description: 'Address'
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
