import { Test, TestingModule } from '@nestjs/testing';
import { MagazinesService } from './magazines.service';
import { Magazine } from './magazine.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

describe('MagazinesService', () => {
  let service: MagazinesService;
  let magazineRepository: Repository<Magazine>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MagazinesService,
        {
          provide: getRepositoryToken(Magazine),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MagazinesService>(MagazinesService);
    magazineRepository = module.get<Repository<Magazine>>(getRepositoryToken(Magazine));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('softDelete', () => {
    it('should soft delete the magazine with the specified ID', async () => {
      const id = 1;
      jest.spyOn(magazineRepository, 'softDelete').mockResolvedValueOnce({ affected: 1 } as UpdateResult);

      const result = await service.softDelete(id);

      expect(result).toEqual({ affected: 1 } as UpdateResult);
    });

    it('should throw NotFoundException if magazine is not found', async () => {
      const id = 1;
      jest.spyOn(magazineRepository, 'softDelete').mockResolvedValueOnce({ affected: 0 } as UpdateResult);

      await expect(service.softDelete(id)).rejects.toThrowError(NotFoundException);
    });
  });
});