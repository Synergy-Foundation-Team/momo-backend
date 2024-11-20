import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user points' })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  @ApiResponse({ 
    status: 200,
    description: 'Returns the user points',
    schema: {
      example: {
        success: true,
        data: {
          points: 1000
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id/points')
  async getUserPoints(@Param('id') id: string) {
    const points = await this.usersService.getUserPoints(Number(id));
    return {
      success: true,
      data: {
        points
      }
    };
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  @ApiResponse({ 
    status: 200,
    description: 'Returns the user profile',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          points: 1000,
          profile: {
            fullName: 'Admin User',
            phoneNumber: '+66123456789',
            address: 'Bangkok, Thailand'
          }
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  async getUserProfile(@Param('id') id: string) {
    const profile = await this.usersService.getUserProfile(Number(id));
    return {
      success: true,
      data: profile
    };
  }
}
