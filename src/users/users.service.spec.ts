import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, LoginDto } from './user.dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password123',
      };
      const expectedHashedPassword = 'password123';
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(expectedHashedPassword as never);
      const saveSpy = jest.spyOn(userRepository, 'save').mockImplementationOnce(async (user: User) => {
        expect(user.username).toBe(createUserDto.username);
        expect(user.password).toBe(expectedHashedPassword);
        return {
          id: 1,
          ...createUserDto,
          password: expectedHashedPassword,
        } as User;
      });

      const result = await service.create(createUserDto);

      expect(result).toEqual({
        id: 1,
        ...createUserDto,
        password: expectedHashedPassword,
      });
      expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining(createUserDto));
    });
  });



  describe('findByUsername', () => {
    it('should return a user if username exists', async () => {
      const username = 'testuser';
      const expectedUser: User = {
        id: 1,
        username: username,
        password: 'hashedPassword',
      };
      jest.spyOn(service, 'findByUsername').mockResolvedValueOnce(expectedUser);

      const result = await service.findByUsername(username);

      expect(result).toEqual(expectedUser);
    });

    it('should return undefined if username does not exist', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(service, 'findByUsername').mockResolvedValueOnce(undefined);

      const result = await service.findByUsername(username);

      expect(result).toBeUndefined();
    });
  });

  describe('findByUsername', () => {
    it('should return a user if username exists', async () => {
      const username = 'testuser';
      const expectedUser: User = {
        id: 1,
        username: username,
        password: 'hashedPassword',
      };
      jest.spyOn(service, 'findByUsername').mockResolvedValueOnce(expectedUser);

      const result = await service.findByUsername(username);

      expect(result).toEqual(expectedUser);
    });

    it('should return undefined if username does not exist', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(service, 'findByUsername').mockResolvedValueOnce(undefined);

      const result = await service.findByUsername(username);

      expect(result).toBeUndefined();
    });
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'password123',
      };
      const user: User = {
        id: 1,
        username: loginDto.username,
        password: 'hashedPassword',
      };
      jest.spyOn(service, 'findByUsername').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const result = await service.validateUser(loginDto);

      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      const loginDto: LoginDto = {
        username: 'nonexistentuser',
        password: 'invalidpassword',
      };
      jest.spyOn(service, 'findByUsername').mockResolvedValueOnce(undefined);

      const result = await service.validateUser(loginDto);

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'invalidpassword',
      };
      const user: User = {
        id: 1,
        username: loginDto.username,
        password: 'hashedPassword',
      };
      jest.spyOn(service, 'findByUsername').mockResolvedValueOnce(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never);

      const result = await service.validateUser(loginDto);

      expect(result).toBeNull();
    });
  });



  describe('generateToken', () => {
    it('should generate a JWT token for the user', async () => {
      const user: User = {
        id: 1,
        username: 'testuser',
        password: 'password123',
      };

      const token = await service.generateToken(user);

      expect(typeof token).toBe('string');
    });
  });
});
