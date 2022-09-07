import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Takes, Time } from 'src/pkg/dal/drug-alert/drug-alert.entity';

export class CreateAlertDto {
  @IsNumber()
  tabs: number;

  @IsEnum(Takes)
  take: Takes;

  @IsEnum(Time)
  time: Time;

  @IsString()
  drugCurrentlyUsedId: string;
}
