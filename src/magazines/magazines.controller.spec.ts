import { Test, TestingModule } from '@nestjs/testing';
import { MagazinesController } from './magazines.controller';
import { MagazinesService } from './magazines.service';
import { NotFoundException } from '@nestjs/common';
import { CreateMagazineDto, UpdateMagazineDto } from './magazine.dto';
import { Magazine } from './magazine.entity';

describe('MagazinesController', () => {
  let controller: MagazinesController;
  let service: MagazinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazinesController],
      providers: [
        {
          provide: MagazinesService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            softDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MagazinesController>(MagazinesController);
    service = module.get<MagazinesService>(MagazinesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of magazines', async () => {
      const magazines: Magazine[] = [
        {
          "id": 1,
          "name": "Test 4",
          "description": "This is Test",
          "deletedAt": null
        }
      ];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(magazines);

      const result = await controller.findAll();

      expect(result).toEqual(magazines);
    });
  });

  describe('findById', () => {
    it('should return the magazine with the specified ID', async () => {
      const id = 1;
      const magazine: Magazine = {
        "id": 1,
        "name": "Test 4",
        "description": "This is Test",
        "deletedAt": null
      };
      jest.spyOn(service, 'findById').mockResolvedValueOnce(magazine);

      const result = await controller.findById(id);

      expect(result).toEqual(magazine);
    });

    it('should throw NotFoundException if magazine is not found', async () => {
      const id = 1;
      jest.spyOn(service, 'findById').mockResolvedValueOnce(undefined);

      await expect(controller.findById(id)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new magazine', async () => {
      const createMagazineDto: CreateMagazineDto = {
        "name": "Test 4",
        "description": "This is Test",
      }
      const createdMagazine: Magazine = {
        "id": 1,
        "name": "Test 4",
        "description": "This is Test",
        "deletedAt": null
      }
      jest.spyOn(service, 'create').mockResolvedValueOnce(createdMagazine);

      const result = await controller.create(createMagazineDto);

      expect(result).toEqual(createdMagazine);
    });
  });

  describe('update', () => {
    it('should update the magazine with the specified ID', async () => {
      const id = 1;
      const updateMagazineDto: UpdateMagazineDto = {
        "name": "Test 4",
        "description": "This is Test"
      }
      const updatedMagazine: Magazine = {
        "id": 1,
        "name": "Test 4",
        "description": "This is Test",
        "deletedAt": null
      }
      jest.spyOn(service, 'update').mockResolvedValueOnce(updatedMagazine);

      const result = await controller.update(id, updateMagazineDto);

      expect(result).toEqual(updatedMagazine);
    });
  });

  describe('softDelete', () => {
    it('should soft delete the magazine with the specified ID', async () => {
      const id = 1;
      jest.spyOn(service, 'softDelete').mockResolvedValueOnce({ raw: [], generatedMaps: [], affected: 1 });

      await expect(controller.softDelete(id)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if magazine is not found', async () => {
      const id = 1;
      jest.spyOn(service, 'softDelete').mockResolvedValueOnce({ raw: [], generatedMaps: [], affected: 0 });

      await expect(controller.softDelete(id)).rejects.toThrowError(NotFoundException);
    });
  });
});
