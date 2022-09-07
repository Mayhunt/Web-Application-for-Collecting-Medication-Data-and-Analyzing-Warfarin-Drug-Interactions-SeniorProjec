import { EntityRepository, Repository } from 'typeorm';
import { AllergicCardPicEntity } from './allergic-card-pic.entity';

@EntityRepository(AllergicCardPicEntity)
export class AllergicCardPicRepository extends Repository<AllergicCardPicEntity> {}
