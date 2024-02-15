import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './user.entity';
import { CreateUserDto, LoginDto } from './user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) { }

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = new User();
		user.username = createUserDto.username;
		user.password = await bcrypt.hash(createUserDto.password, 8);
		return await this.userRepository.save(user);
	}

	async findByUsername(username: string): Promise<User | undefined> {
		return await this.userRepository.findOne({ where: { username } });
	}

	async validateUser(loginDto: LoginDto): Promise<User | null> {
		const user = await this.findByUsername(loginDto.username);
		if (user && await bcrypt.compare(loginDto.password, user.password)) {
			return user;
		}
		return null;
	}

	async generateToken(user: User): Promise<string> {
		const payload = { username: user.username, sub: user.id };
		return jwt.sign(payload, 'assignment', { expiresIn: '1h' });
	}
}
