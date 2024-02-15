import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMagazineDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;
}

export class UpdateMagazineDto {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly description?: string;
}