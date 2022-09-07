import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateCurrentlyDrugDto {
  @IsString()
  drugId: string;

  @IsDate()
  @Type(() => Date)
  receiveDate: Date;

  @IsString()
  receivePlace: string;

  @IsString()
  more: string;

  @IsBoolean()
  alertStatus: boolean;
}
