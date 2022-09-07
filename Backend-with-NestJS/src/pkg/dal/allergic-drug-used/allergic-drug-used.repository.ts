import { EntityRepository, Repository } from 'typeorm';
import { AllergicDrugUsedEntity } from './allergic-drug-used.entity';

@EntityRepository(AllergicDrugUsedEntity)
export class AllergicDrugUsedRepository extends Repository<AllergicDrugUsedEntity> {}
