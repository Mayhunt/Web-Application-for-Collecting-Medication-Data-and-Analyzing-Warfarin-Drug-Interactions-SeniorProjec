import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllergicCardPicEntity } from 'src/pkg/dal/allergic-card-pic/allergic-card-pic.entity';
import { AllergicCardPicRepository } from 'src/pkg/dal/allergic-card-pic/allergic-card-pic.repository';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { CreateCardPicDto } from './dto/create-CardPic.dto';

@Injectable()
export class CardPicService {
  constructor(
    @InjectRepository(AllergicCardPicRepository)
    private cardPicRepository: AllergicCardPicRepository,
  ) {}

  async createCardPic(
    createCardPicDto: CreateCardPicDto,
    user: UserEntity,
  ): Promise<AllergicCardPicEntity> {
    try {
      const { cardPic } = createCardPicDto;
      const card = this.cardPicRepository.create({
        cardPic,
        user,
      });
      await this.cardPicRepository.save(card);
      return card;
    } catch (e) {
      throw new NotFoundException({
        message: ['Creating not success'],
      });
    }
  }

  async getCardPics(user: UserEntity): Promise<AllergicCardPicEntity[]> {
    try {
      const cardPics = await this.cardPicRepository.find({ where: { user } });
      return cardPics;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get Data not success'],
      });
    }
  }

  async getCardPicById(
    id: string,
    user: UserEntity,
  ): Promise<AllergicCardPicEntity> {
    try {
      const cardPic = await this.cardPicRepository.findOneOrFail({
        where: { user, id },
      });
      return cardPic;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get Data not success'],
      });
    }
  }

  async deleteCardPic(id: string, user: UserEntity) {
    try {
      const cardPic = await this.getCardPicById(id, user);
      await this.cardPicRepository.delete(id);
      return cardPic;
    } catch (e) {
      throw new NotFoundException({
        message: ['Deleting not success'],
      });
    }
  }
}
