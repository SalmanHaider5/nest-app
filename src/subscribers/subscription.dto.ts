import { IsNotEmpty, IsNumber } from 'class-validator';

export class SubscribeDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  magazineId: number;
}