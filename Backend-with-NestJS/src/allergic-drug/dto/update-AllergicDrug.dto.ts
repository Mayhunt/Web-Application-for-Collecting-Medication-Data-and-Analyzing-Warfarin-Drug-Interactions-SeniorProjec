import { IsOptional } from 'class-validator';

export class UpdateAllergicDrugDto {
  // generic name not change
  @IsOptional()
  symptom?: string;

  @IsOptional()
  place?: string;

  @IsOptional()
  more?: string;
}
