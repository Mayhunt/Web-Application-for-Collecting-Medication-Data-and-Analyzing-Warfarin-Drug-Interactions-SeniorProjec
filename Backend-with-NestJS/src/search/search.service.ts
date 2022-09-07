import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugEntity } from 'src/pkg/dal/drug/drug.entity';
import { DrugRepository } from 'src/pkg/dal/drug/drug.repository';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(DrugRepository)
    private drugRepository: DrugRepository,
  ) {}
  // เหี้ยไรว้ะ
  async getDrugs(): Promise<DrugEntity[]> {
    const Drugs = await this.drugRepository.find();
    return Drugs;
  }
  async searchDrug(search: string): Promise<DrugEntity[]> {
    try {
      const query = this.drugRepository.createQueryBuilder('drugEntity');
      if (search) {
        query.where('Lower(drugEntity.genericName) LIKE Lower(search)', {
          search: `%${search}%`,
        });
      }

      const drugs = await query.getMany();
      return drugs;
    } catch (e) {
      throw new NotFoundException({
        message: [' Drug not found'],
      });
    }
  }
}
