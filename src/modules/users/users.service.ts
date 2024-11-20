import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  points: number;
  profile: {
    fullName: string;
    phoneNumber: string;
    address: string;
  };
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123456',
      email: 'admin@example.com',
      points: 1000,
      profile: {
        fullName: 'Admin User',
        phoneNumber: '+66123456789',
        address: 'Bangkok, Thailand',
      },
    },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserPoints(id: number): Promise<number> {
    const user = await this.findById(id);
    return user?.points || 0;
  }

  async getUserProfile(id: number): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.findById(id);
    if (!user) return undefined;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
