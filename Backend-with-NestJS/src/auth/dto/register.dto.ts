import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  idCardNumber: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsString()
  bloodGroup: string;

  @IsString()
  medicationCondition: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;

  @IsNumber()
  bmi: number;

  @IsString()
  phoneNum: string;

  @IsString()
  emergencyContact: string;

  @IsString()
  emergencyPhoneNum: string;

  @IsString()
  pic: string;
}
