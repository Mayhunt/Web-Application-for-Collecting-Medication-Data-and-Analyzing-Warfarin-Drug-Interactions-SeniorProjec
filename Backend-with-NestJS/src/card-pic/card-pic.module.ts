import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllergicCardPicRepository } from 'src/pkg/dal/allergic-card-pic/allergic-card-pic.repository';
import { CardPicController } from './card-pic.controller';
import { CardPicService } from './card-pic.service';

@Module({
  imports: [TypeOrmModule.forFeature([AllergicCardPicRepository])],
  controllers: [CardPicController],
  providers: [CardPicService],
})
export class CardPicModule {}
