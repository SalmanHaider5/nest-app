import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Magazine } from './magazine.entity';
import { CreateMagazineDto, UpdateMagazineDto } from './magazine.dto';

@Injectable()
export class MagazinesService {
  constructor(
    @InjectRepository(Magazine)
    private readonly magazineRepository: Repository<Magazine>,
  ) { }

  async findById(id: number): Promise<Magazine | undefined> {
    return this.magazineRepository.findOne({ where: { id }});
  }

  async findAll(): Promise<Magazine[]> {
    return await this.magazineRepository.find({
      where: {
        deletedAt: null,
      }
    });
  }

  async create(createMagazineDto: CreateMagazineDto): Promise<Magazine> {
    const magazine = new Magazine();
    magazine.name = createMagazineDto.name;
    magazine.description = createMagazineDto.description;
    return await this.magazineRepository.save(magazine);
  }

  async softDelete(id: number): Promise<UpdateResult> {
    const result = await this.magazineRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Magazine with ID ${id} not found`);
    }
    return result;
  }

  async update(id: number, updateMagazineDto: UpdateMagazineDto): Promise<Magazine> {
    const existingMagazine = await this.magazineRepository.findOne({ where: { id }});
    if (!existingMagazine) {
      throw new NotFoundException(`Magazine with ID ${id} not found`);
    }
    return this.magazineRepository.save({ ...existingMagazine, ...updateMagazineDto });
  }
}