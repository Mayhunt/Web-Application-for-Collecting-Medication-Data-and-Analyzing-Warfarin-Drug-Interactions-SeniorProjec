import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AllergicDrugUsedEntity } from '../allergic-drug-used/allergic-drug-used.entity';
import { BaseEntity } from '../base/base.entity';
import { DrugCurrentlyUsedEntity } from '../drug-currently-used/drug-currently-used.entity';

@Entity({ name: 'drug' })
export class DrugEntity extends BaseEntity {
  @Column({ name: 'generic_name', type: 'varchar', length: 255 })
  genericName: string;

  @Column({ type: 'varchar', length: 255 })
  caution: string;

  @Column({ type: 'varchar', length: 255 })
  pic: string;

  @OneToMany(
    () => AllergicDrugUsedEntity,
    (allergicDrugUsed) => allergicDrugUsed.drug,
  )
  allergicDrugUseds: AllergicDrugUsedEntity[];

  @OneToMany(
    () => DrugCurrentlyUsedEntity,
    (drugCurrentlyUsed) => drugCurrentlyUsed.drug,
  )
  drugCurrentlyUseds: DrugCurrentlyUsedEntity[];
}
