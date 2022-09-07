import { IsOptional } from 'class-validator';
import { Takes, Time } from 'src/pkg/dal/drug-alert/drug-alert.entity';

export class UpdateAlertDto {
  @IsOptional()
  tabs?: number;

  @IsOptional()
  take?: Takes;

  @IsOptional()
  time?: Time;

  @IsOptional()
  every_hour?: number;
}
