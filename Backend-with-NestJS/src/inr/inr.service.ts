import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InrEntity } from 'src/pkg/dal/inr/inr.entity';
import { InrRepository } from 'src/pkg/dal/inr/inr.repository';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { CreateInrDto } from './dto/create-inr.dto';
import { UpdateInrDto } from './dto/update-inr.dto';

@Injectable()
export class InrService {
  constructor(
    @InjectRepository(InrRepository)
    private inrRepository: InrRepository,
  ) {}

  async createInr(
    createInrDto: CreateInrDto,
    user: UserEntity,
  ): Promise<InrEntity> {
    try {
      const { followDate, inrExpect, inrMeasure } = createInrDto;
      const inr = this.inrRepository.create({
        followDate,
        inrExpect,
        inrMeasure,
        user,
      });
      await this.inrRepository.save(inr);
      return inr;
    } catch (e) {
      throw new NotFoundException({
        message: ['Creating not success'],
      });
    }
  }

  async getInrs(user: UserEntity): Promise<InrEntity[]> {
    try {
      const Inrs = await this.inrRepository.find({ where: { user } });
      return Inrs;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get INR Data not success'],
      });
    }
  }

  async getInrById(id: string, user: UserEntity): Promise<InrEntity> {
    try {
      const Inr = await this.inrRepository.findOneOrFail({
        where: { user, id },
      });
      return Inr;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get INR Data not success'],
      });
    }
  }

  async updateInr(id: string, updateInrDto: UpdateInrDto, user: UserEntity) {
    try {
      const Inr = await this.getInrById(id, user);

      const { followDate, inrExpect, inrMeasure } = updateInrDto;

      if (followDate) {
        Inr.followDate = followDate;
      }

      if (inrExpect) {
        Inr.inrExpect = inrExpect;
      }

      if (inrMeasure) {
        Inr.inrMeasure = inrMeasure;
      }

      await this.inrRepository.save(Inr);
      return Inr;
    } catch (e) {
      throw new NotFoundException({
        message: ['Updating not success'],
      });
    }
  }

  async deleteInr(id: string, user: UserEntity) {
    try {
      const Inr = await this.getInrById(id, user);
      await this.inrRepository.delete(id);
      return Inr;
    } catch (e) {
      throw new NotFoundException({
        message: ['Deleting not success'],
      });
    }
  }
}
