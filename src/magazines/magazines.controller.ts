import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { Magazine } from './magazine.entity';
import { CreateMagazineDto, UpdateMagazineDto } from './magazine.dto';
import { MagazinesService } from './magazines.service';

@Controller('magazines')
export class MagazinesController {
  constructor(private readonly magazinesService: MagazinesService) {}

  @Get()
  async findAll(): Promise<Magazine[]> {
    return this.magazinesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Magazine> {
    const magazine = await this.magazinesService.findById(id);
    if (!magazine) {
      throw new NotFoundException(`Magazine with ID ${id} not found`);
    }
    return magazine;
  }

  @Post()
  async create(@Body() createMagazineDto: CreateMagazineDto): Promise<Magazine> {
    return this.magazinesService.create(createMagazineDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMagazineDto: UpdateMagazineDto): Promise<Magazine> {
    return this.magazinesService.update(id, updateMagazineDto);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: number): Promise<void> {
    const result = await this.magazinesService.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Magazine with ID ${id} not found`);
    }
  }
}
