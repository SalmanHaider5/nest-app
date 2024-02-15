import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginDto } from './user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findByUsername(username: string): Promise<User | undefined>;
    validateUser(loginDto: LoginDto): Promise<User | null>;
    generateToken(user: User): Promise<string>;
}
