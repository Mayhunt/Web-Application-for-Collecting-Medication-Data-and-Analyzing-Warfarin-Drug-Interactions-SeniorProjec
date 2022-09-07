import { EntityRepository, Repository } from 'typeorm';
import { DrugCurrentlyUsedEntity } from './drug-currently-used.entity';

@EntityRepository(DrugCurrentlyUsedEntity)
export class DrugCurrentlyUsedRepository extends Repository<DrugCurrentlyUsedEntity> {}
