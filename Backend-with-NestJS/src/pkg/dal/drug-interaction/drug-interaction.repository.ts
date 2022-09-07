import { EntityRepository, Repository } from 'typeorm';
import { DrugInteractionEntity } from './drug-interaction.entity';

@EntityRepository(DrugInteractionEntity)
export class DrugInteractionRepository extends Repository<DrugInteractionEntity> {}
