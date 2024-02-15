import { User } from './user.entity';
import { CreateUserDto, LoginDto } from './user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    } | null>;
}
