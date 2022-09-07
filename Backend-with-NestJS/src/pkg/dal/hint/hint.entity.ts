import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'hint' })
export class HintEntity extends BaseEntity {
  @Column({ type: 'text' })
  hint: string;
}
