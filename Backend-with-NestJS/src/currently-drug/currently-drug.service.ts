import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugCurrentlyUsedEntity } from 'src/pkg/dal/drug-currently-used/drug-currently-used.entity';
import { DrugCurrentlyUsedRepository } from 'src/pkg/dal/drug-currently-used/drug-currently-used.repository';
import { DrugRepository } from 'src/pkg/dal/drug/drug.repository';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { CreateCurrentlyDrugDto } from './dto/create-CurrentlyDrug.dto';
import { UpdateCurrentlyDrugDto } from './dto/update-CurrentlyDrug.dto';

@Injectable()
export class CurrentlyDrugService {
  constructor(
    @InjectRepository(DrugCurrentlyUsedRepository)
    private currentlyDrugRepository: DrugCurrentlyUsedRepository,

    @InjectRepository(DrugRepository)
    private drugRepository: DrugRepository,
  ) {}
  // อีส่วนที่เป็น บูลีนนี่จะเอาไงกะกู
  async createCurrentlyDrug(
    createCurrentlyDrugDto: CreateCurrentlyDrugDto,
    user: UserEntity,
    // drugAlert: DrugAlertEntity,
  ): Promise<DrugCurrentlyUsedEntity> {
    try {
      const {
        receiveDate,
        receivePlace,
        alertStatus,
        more,
        // ถ้าไม่เตือนค่าข้างล่างไม่มี ต้องทำไง
        // drugAlert,
        // tabs,
        // ค่า enum
        // take,
        // time,
        // everyHour,
      } = createCurrentlyDrugDto;
      const drug = await this.drugRepository.findOneOrFail({
        id: createCurrentlyDrugDto.drugId,
      });
      // const alert = await this.drugAlertRepository.save(alert);
      const createCurrentlyDrug = this.currentlyDrugRepository.create({
        receiveDate,
        receivePlace,
        more,
        alertStatus,
        // drugAlert,
        // tabs,
        // take,
        // time,
        // everyHour,
        genericName: drug.genericName,
        user,
      });
      await this.currentlyDrugRepository.save(createCurrentlyDrug);
      return createCurrentlyDrug;
    } catch (e) {
      throw new NotFoundException({
        message: ['Creating not success'],
      });
    }
  }

  // เอาค่า generic name + drug image + more
  // ต้องมีส่วนที่ดึง drugIdมาด้วยใช่มั้ย
  async getCurrentlyDrugs(
    user: UserEntity,
  ): Promise<DrugCurrentlyUsedEntity[]> {
    try {
      const CurrentlyDrugs = await this.currentlyDrugRepository.find({
        where: { user },
        relations: ['drugAlert'],
      });
      return CurrentlyDrugs;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get Data not success'],
      });
    }
  }

  async getCurrentlyDrugById(
    id: string,
    user: UserEntity,
  ): Promise<DrugCurrentlyUsedEntity> {
    try {
      const CurrentlyDrug = await this.currentlyDrugRepository.findOneOrFail({
        where: { user, id },
        relations: ['drugAlert'],
      });
      return CurrentlyDrug;
    } catch (e) {
      throw new NotFoundException({
        message: ['Creating Drug Data not success'],
      });
    }
  }

  async updateCurrentlyDrug(
    id: string,
    updateCurrentlyDrugDto: UpdateCurrentlyDrugDto,
    user: UserEntity,
  ) {
    try {
      const CurrentlyDrug = await this.getCurrentlyDrugById(id, user);

      const { receiveDate, receivePlace, more, alertStatus } =
        updateCurrentlyDrugDto;

      if (receiveDate) {
        CurrentlyDrug.receiveDate = receiveDate;
      }

      if (receivePlace) {
        CurrentlyDrug.receivePlace = receivePlace;
      }

      if (more) {
        CurrentlyDrug.more = more;
      }

      if (alertStatus !== undefined) {
        CurrentlyDrug.alertStatus = alertStatus;
      }

      await this.currentlyDrugRepository.save(CurrentlyDrug);
      return CurrentlyDrug;
    } catch (e) {
      throw new NotFoundException({
        message: ['Currently Drug Not Found'],
      });
    }
  }

  async deleteCurrentlyDrug(id: string, user: UserEntity) {
    try {
      const CurrentlyDrug = await this.getCurrentlyDrugById(id, user);
      await this.currentlyDrugRepository.delete(id);
      return CurrentlyDrug;
    } catch (e) {
      throw new NotFoundException({
        message: ['Deleting not success'],
      });
    }
  }
}
