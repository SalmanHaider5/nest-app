import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MagazinesController } from './magazines.controller';
import { MagazinesService } from './magazines.service';
import { Magazine } from './magazine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Magazine])],
  controllers: [MagazinesController],
  providers: [MagazinesService],
  exports: [MagazinesService],
})
export class MagazinesModule {}