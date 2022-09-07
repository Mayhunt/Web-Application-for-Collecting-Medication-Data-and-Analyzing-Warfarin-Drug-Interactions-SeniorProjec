import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { DrugAlertEntity } from '../drug-alert/drug-alert.entity';
import { DrugEntity } from '../drug/drug.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'drug_currently_used' })
export class DrugCurrentlyUsedEntity extends BaseEntity {
  @Column({ name: 'generic_name', type: 'varchar', length: 255 })
  genericName: string;

  @Column({ name: 'receive_date', type: 'timestamptz' })
  receiveDate: Date;

  @Column({ name: 'receive_place', type: 'varchar', length: 255 })
  receivePlace: string;

  @Column({ type: 'varchar', length: 255 })
  more: string;

  @Column({ name: 'alert_status', type: 'boolean' })
  alertStatus: boolean;

  @ManyToOne(() => UserEntity, (user) => user.drugCurrentlyUseds, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => DrugEntity, (drug) => drug.drugCurrentlyUseds)
  @JoinColumn({ name: 'drug_id' })
  drug: DrugEntity;

  @OneToMany(
    () => DrugCurrentlyUsedEntity,
    (drugCurrentlyUsed) => drugCurrentlyUsed.user,
    { cascade: true },
  )
  drugCurrentlyUseds: DrugCurrentlyUsedEntity[];

  @OneToOne(() => DrugAlertEntity)
  @JoinColumn()
  drugAlert: DrugAlertEntity;
}
