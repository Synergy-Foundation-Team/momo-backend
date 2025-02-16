import { Injectable, NotFoundException } from '@nestjs/common';
import {
  User,
  CreateUserDto,
  UserResponse,
  UpdateProfileDto,
} from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private currentId = 1;

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findById(id: number): Promise<UserResponse | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: this.currentId++,
      ...createUserDto,
      points: 0, // Initialize with 0 points
      profile: {
        fullName: '',
        phoneNumber: '',
        address: '',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async getUserPoints(id: number): Promise<number> {
    const user = await this.findById(id);
    return user.points;
  }

  async updatePoints(id: number, points: number): Promise<number> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.points = points;
    user.updatedAt = new Date();
    return user.points;
  }

  async getUserProfile(id: number): Promise<UserResponse> {
    return this.findById(id);
  }

  async updateProfile(
    id: number,
    profileData: UpdateProfileDto,
  ): Promise<UserResponse> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.profile = profileData;
    user.updatedAt = new Date();

    const { password, ...result } = user;
    return result;
  }
}
