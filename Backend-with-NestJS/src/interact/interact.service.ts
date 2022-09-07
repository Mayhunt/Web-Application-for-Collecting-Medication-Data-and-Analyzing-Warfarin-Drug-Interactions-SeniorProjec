import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DrugInteractionEntity } from 'src/pkg/dal/drug-interaction/drug-interaction.entity';
import { DrugInteractionRepository } from 'src/pkg/dal/drug-interaction/drug-interaction.repository';

@Injectable()
export class InteractService {
  constructor(
    @InjectRepository(DrugInteractionRepository)
    private drugInteractRepository: DrugInteractionRepository,
  ) {}
  // เหี้ยไรว้ะ
  async getInteract(): Promise<DrugInteractionEntity[]> {
    const Drugs = await this.drugInteractRepository.find();
    return Drugs;
  }
}
