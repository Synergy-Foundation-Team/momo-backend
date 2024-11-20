import { Controller, Get, Put, Param, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  @ApiResponse({ 
    status: 200,
    description: 'Returns the user information',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          username: 'johndoe',
          email: 'john@example.com',
          points: 1000,
          profile: {
            fullName: 'John Doe',
            phoneNumber: '+66123456789',
            address: 'Bangkok, Thailand'
          },
          createdAt: '2023-11-15T12:00:00.000Z',
          updatedAt: '2023-11-15T12:00:00.000Z'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404,
    description: 'User not found'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findById(Number(id));
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    return {
      success: true,
      data: user
    };
  }

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
  @ApiResponse({ 
    status: 404,
    description: 'User not found'
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
          username: 'johndoe',
          email: 'john@example.com',
          points: 1000,
          profile: {
            fullName: 'John Doe',
            phoneNumber: '+66123456789',
            address: 'Bangkok, Thailand'
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404,
    description: 'User not found'
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

  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'id', description: 'User ID', example: 1 })
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ 
    status: 200,
    description: 'Returns the updated user profile',
    schema: {
      example: {
        success: true,
        data: {
          id: 1,
          username: 'johndoe',
          email: 'john@example.com',
          points: 1000,
          profile: {
            fullName: 'John Doe',
            phoneNumber: '+66123456789',
            address: 'Bangkok, Thailand'
          }
        }
      }
    }
  })
  @ApiResponse({ 
    status: 404,
    description: 'User not found'
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id/profile')
  async updateProfile(@Param('id') id: string, @Body() profileData: UpdateProfileDto) {
    const updatedUser = await this.usersService.updateProfile(Number(id), profileData);
    return {
      success: true,
      data: updatedUser
    };
  }
}
