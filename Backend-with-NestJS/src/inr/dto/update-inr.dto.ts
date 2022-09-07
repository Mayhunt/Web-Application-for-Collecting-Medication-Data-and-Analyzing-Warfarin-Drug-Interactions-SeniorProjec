import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateInrDto {
  @IsOptional()
  @Type(() => Date)
  followDate?: Date;

  @IsOptional()
  inrExpect?: number;

  @IsOptional()
  inrMeasure?: number;
}
