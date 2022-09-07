import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'drug_interaction' })
export class DrugInteractionEntity extends BaseEntity {
  @Column({ name: 'generic_name', type: 'varchar', length: 255 })
  genericName: string;

  @Column({ type: 'varchar', length: 255 })
  criteria: string;

  @Column({ name: 'effect_inr', type: 'varchar', length: 255 })
  effectInr: string;
}
