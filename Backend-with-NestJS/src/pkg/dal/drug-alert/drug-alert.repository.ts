import { EntityRepository, Repository } from 'typeorm';
import { DrugAlertEntity } from './drug-alert.entity';

@EntityRepository(DrugAlertEntity)
export class DrugAlertRepository extends Repository<DrugAlertEntity> {}
