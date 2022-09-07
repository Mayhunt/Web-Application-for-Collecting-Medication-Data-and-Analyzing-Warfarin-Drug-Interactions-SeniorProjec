import { EntityRepository, Repository } from 'typeorm';
import { HintEntity } from './hint.entity';

@EntityRepository(HintEntity)
export class HintRepository extends Repository<HintEntity> {}
