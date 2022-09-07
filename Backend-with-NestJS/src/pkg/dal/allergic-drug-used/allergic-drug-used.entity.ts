import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { DrugEntity } from '../drug/drug.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'allergic_drug_used' })
export class AllergicDrugUsedEntity extends BaseEntity {
  @Column({ name: 'generic_name', type: 'varchar', length: 255 })
  genericName: string;

  @Column({ type: 'varchar', length: 255 })
  symptom: string;

  @Column({ type: 'varchar', length: 255 })
  place: string;

  @Column({ type: 'varchar', length: 255 })
  more: string;

  @ManyToOne(() => UserEntity, (user) => user.allergicDrugUseds, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => DrugEntity, (drug) => drug)
  @JoinColumn({ name: 'drug_id' })
  drug: DrugEntity;
}
