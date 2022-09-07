import { EntityRepository, Repository } from 'typeorm';
import { InrEntity } from './inr.entity';

@EntityRepository(InrEntity)
export class InrRepository extends Repository<InrEntity> {}
