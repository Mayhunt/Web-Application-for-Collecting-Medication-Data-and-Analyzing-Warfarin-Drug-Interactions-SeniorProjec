import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateMeDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  idCardNumber?: string;

  @IsDate()
  @Type(() => Date)
  birthDate?: Date;

  @IsOptional()
  bloodGroup?: string;

  @IsOptional()
  medicationCondition?: string;

  @IsOptional()
  weight?: number;

  @IsOptional()
  height?: number;

  @IsOptional()
  bmi?: number;

  @IsOptional()
  phoneNum?: string;

  @IsOptional()
  emergencyContact?: string;

  @IsOptional()
  emergencyPhoneNum?: string;

  @IsOptional()
  pic?: string;
}
