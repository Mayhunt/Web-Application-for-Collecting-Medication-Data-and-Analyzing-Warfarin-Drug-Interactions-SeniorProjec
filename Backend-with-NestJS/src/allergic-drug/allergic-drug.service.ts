import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllergicDrugUsedEntity } from 'src/pkg/dal/allergic-drug-used/allergic-drug-used.entity';
import { AllergicDrugUsedRepository } from 'src/pkg/dal/allergic-drug-used/allergic-drug-used.repository';
import { DrugRepository } from 'src/pkg/dal/drug/drug.repository';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { CreateAllergicDrugDto } from './dto/create-AllergicDrug.dto';
import { UpdateAllergicDrugDto } from './dto/update-AllergicDrug.dto';

@Injectable()
export class AllergicDrugService {
  constructor(
    @InjectRepository(AllergicDrugUsedRepository)
    private allergicDrugUsedRepository: AllergicDrugUsedRepository,

    @InjectRepository(DrugRepository)
    private drugRepository: DrugRepository,
  ) {}

  async createAllergicDrug(
    createAllergicDrugDto: CreateAllergicDrugDto,
    user: UserEntity,
  ): Promise<AllergicDrugUsedEntity> {
    try {
      const { symptom, place, more } = createAllergicDrugDto;

      const drug = await this.drugRepository.findOneOrFail({
        id: createAllergicDrugDto.drugId,
      });

      const createAllergicDrug = this.allergicDrugUsedRepository.create({
        symptom,
        place,
        more,
        genericName: drug.genericName,
        user,
      });

      await this.allergicDrugUsedRepository.save(createAllergicDrug);
      return createAllergicDrug;
    } catch (e) {
      throw new NotFoundException({
        message: ['Creating not success'],
      });
    }
  }

  // เอาแค่ค่า generic name + drug image + symptom
  async getAllergicDrugs(user: UserEntity): Promise<AllergicDrugUsedEntity[]> {
    try {
      const AllergicDrugs = await this.allergicDrugUsedRepository.find({
        where: { user },
      });
      return AllergicDrugs;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get Allergic Drug Data not success'],
      });
    }
  }

  async getAllergicDrugById(
    id: string,
    user: UserEntity,
  ): Promise<AllergicDrugUsedEntity> {
    try {
      const AllergicDrug = await this.allergicDrugUsedRepository.findOneOrFail({
        where: { user, id },
      });
      return AllergicDrug;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get Allergic Drug Data not success'],
      });
    }
  }
  // ไม่ต้องอัพเดท generic name
  async updateAllergicDrug(
    id: string,
    updateAllergicDrugDto: UpdateAllergicDrugDto,
    user: UserEntity,
  ) {
    try {
      const AllergicDrug = await this.getAllergicDrugById(id, user);

      const { symptom, place, more } = updateAllergicDrugDto;

      if (symptom) {
        AllergicDrug.symptom = symptom;
      }

      if (place) {
        AllergicDrug.place = place;
      }

      if (more) {
        AllergicDrug.more = more;
      }

      await this.allergicDrugUsedRepository.save(AllergicDrug);
      return AllergicDrug;
    } catch (e) {
      throw new NotFoundException({
        message: ['Allergic Drug Not Found'],
      });
    }
  }

  async deleteAllergicDrug(id: string, user: UserEntity) {
    try {
      const AllergicDrug = await this.getAllergicDrugById(id, user);
      await this.allergicDrugUsedRepository.delete(id);
      return AllergicDrug;
    } catch (e) {
      throw new NotFoundException({
        message: ['Deleting not success'],
      });
    }
  }

  // static createAllergicDrug(CreateAllergicDrugDto: CreateAllergicDrugDto) {
  //     throw new Error('Method not implemented.');
  // }
}
