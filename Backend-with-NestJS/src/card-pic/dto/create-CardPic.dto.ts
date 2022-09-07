import { IsString } from 'class-validator';

export class CreateCardPicDto {
  @IsString()
  cardPic: string;
}
