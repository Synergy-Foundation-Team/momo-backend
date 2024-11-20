import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123456',
      email: 'admin@example.com',
    },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}
