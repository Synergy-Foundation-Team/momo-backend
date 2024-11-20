export interface UserProfile {
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  points: number;
  profile: UserProfile;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'points' | 'profile'>;
export type UserResponse = Omit<User, 'password'>;
export type UpdateProfileDto = UserProfile;
