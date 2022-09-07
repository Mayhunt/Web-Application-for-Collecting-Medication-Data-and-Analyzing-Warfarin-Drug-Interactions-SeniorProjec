import { EntityRepository, Repository } from 'typeorm';
import { DrugEntity } from './drug.entity';

@EntityRepository(DrugEntity)
export class DrugRepository extends Repository<DrugEntity> {}
