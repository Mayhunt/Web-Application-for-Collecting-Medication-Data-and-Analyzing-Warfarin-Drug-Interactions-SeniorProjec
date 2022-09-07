import { IsString } from 'class-validator';

export class CreateAllergicDrugDto {
  @IsString()
  symptom: string;

  @IsString()
  place: string;

  @IsString()
  more: string;

  @IsString()
  drugId: string;
}
