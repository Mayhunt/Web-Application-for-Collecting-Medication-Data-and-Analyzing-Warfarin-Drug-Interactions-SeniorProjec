import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'inr' })
export class InrEntity extends BaseEntity {
  @Column({ name: 'follow_date', type: 'timestamptz' })
  followDate: Date;

  @Column({ name: 'inr_expect', type: 'numeric' })
  inrExpect: number;

  @Column({ name: 'inr_measure', type: 'numeric' })
  inrMeasure: number;

  @ManyToOne(() => UserEntity, (user) => user.inrs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
