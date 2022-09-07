import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class CreateInrDto {
  @IsDate()
  @Type(() => Date)
  followDate: Date;

  @IsNumber()
  inrExpect: number;

  @IsNumber()
  inrMeasure: number;
}
