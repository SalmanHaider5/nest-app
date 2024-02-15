import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, LoginDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string } | null> {
    const user = await this.usersService.validateUser(loginDto);
    if (user) {
      const token = await this.usersService.generateToken(user);
      return { ...user, token };
    }
    return null;
  }
}