import { IsString } from 'class-validator';

export class CreateHintDto {
  @IsString()
  hint: string;
}
