import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, LoginDto } from './user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: Partial<UsersService>;

  beforeEach(async () => {
    const usersServiceMock: Partial<UsersService> = {
      create: jest.fn(),
      validateUser: jest.fn(),
      generateToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = { username: 'testuser', password: 'password123' };
      const newUser = { id: 1, username: 'testuser', password: 'password123' };

      jest.spyOn(usersService, 'create').mockResolvedValue(newUser);

      expect(await controller.register(createUserDto)).toBe(newUser);
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should return user object with token if login is successful', async () => {
      const loginDto: LoginDto = { username: 'testuser', password: 'password123' };
      const user = { id: 1, username: 'testuser', password: 'password123' };
      const token = 'token123';

      jest.spyOn(usersService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(usersService, 'generateToken').mockResolvedValue(token);

      const result = await controller.login(loginDto);

      expect(result).toEqual({ ...user, token });
      expect(usersService.validateUser).toHaveBeenCalledWith(loginDto);
      expect(usersService.generateToken).toHaveBeenCalledWith(user);
    });

    it('should return null if login is unsuccessful', async () => {
      const loginDto: LoginDto = { username: 'invaliduser', password: 'invalidpassword' };

      jest.spyOn(usersService, 'validateUser').mockResolvedValue(null);

      const result = await controller.login(loginDto);

      expect(result).toBeNull();
      expect(usersService.validateUser).toHaveBeenCalledWith(loginDto);
      expect(usersService.generateToken).not.toHaveBeenCalled();
    });
  });
});