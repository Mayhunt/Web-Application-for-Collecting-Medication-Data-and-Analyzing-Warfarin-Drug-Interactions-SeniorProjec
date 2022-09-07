import { IsOptional } from 'class-validator';

export class SearchDto {
  @IsOptional()
  search?: string;
}
