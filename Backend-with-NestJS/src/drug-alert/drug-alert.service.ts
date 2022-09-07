import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugAlertEntity } from 'src/pkg/dal/drug-alert/drug-alert.entity';
import { DrugAlertRepository } from 'src/pkg/dal/drug-alert/drug-alert.repository';
import { DrugCurrentlyUsedRepository } from 'src/pkg/dal/drug-currently-used/drug-currently-used.repository';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class DrugAlertService {
  constructor(
    @InjectRepository(DrugAlertRepository)
    private drugAlertRepository: DrugAlertRepository,

    @InjectRepository(DrugCurrentlyUsedRepository)
    private drugCurrentlyUsedRepository: DrugCurrentlyUsedRepository,
  ) {}

  async createDrugAlert(
    createAlertDto: CreateAlertDto,
    // drugCurrentlyUsed: DrugCurrentlyUsedEntity,
  ): Promise<DrugAlertEntity> {
    try {
      const { take, tabs, time } = createAlertDto;
      const alert = this.drugAlertRepository.create({
        tabs,
        time,
        take,
        // drugCurrentlyUsed,
      });
      const alertFinal = await this.drugAlertRepository.save(alert);
      const CurrentlyDrug =
        await this.drugCurrentlyUsedRepository.findOneOrFail({
          where: { id: createAlertDto.drugCurrentlyUsedId },
        });
      CurrentlyDrug.drugAlert = alertFinal;
      await this.drugCurrentlyUsedRepository.save(CurrentlyDrug);
      return alert;
    } catch (e) {
      throw new NotFoundException({
        message: ['Creating not success'],
      });
    }
  }

  async getDrugAlert(): Promise<DrugAlertEntity[]> {
    try {
      const alert = await this.drugAlertRepository.find();
      return alert;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get data not success'],
      });
    }
  }

  async getDrugAlertById(id: string): Promise<DrugAlertEntity> {
    try {
      const alert = await this.drugAlertRepository.findOneOrFail(id);
      return alert;
    } catch (e) {
      throw new NotFoundException({
        message: ['Get data not success'],
      });
    }
  }

  async updateDrugAlert(id: string, updateAlertDto: UpdateAlertDto) {
    try {
      const alert = await this.getDrugAlertById(id);

      const { take, tabs, time } = updateAlertDto;

      if (take) {
        alert.take = take;
      }

      if (tabs) {
        alert.tabs = tabs;
      }

      if (time) {
        alert.time = time;
      }

      await this.drugAlertRepository.save(alert);
      return alert;
    } catch (e) {
      throw new NotFoundException({
        message: ['Updating not success'],
      });
    }
  }
  async deleteDrugAlert(id: string) {
    try {
      const DrugAlert = await this.getDrugAlertById(id);
      await this.drugAlertRepository.delete(id);
      return DrugAlert;
    } catch (e) {
      throw new NotFoundException({
        message: ['Deleting not success'],
      });
    }
  }
}
