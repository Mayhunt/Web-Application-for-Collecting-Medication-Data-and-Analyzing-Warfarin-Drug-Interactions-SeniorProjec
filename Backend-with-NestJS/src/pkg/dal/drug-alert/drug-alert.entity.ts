import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { DrugCurrentlyUsedEntity } from '../drug-currently-used/drug-currently-used.entity';

export enum Takes {
  BEFOREMEAL = 'before meal',
  AFTERMEAL = 'after meal',
}
export enum Time {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  BEFOREBED = 'Before Bed',
}

@Entity({ name: 'drug_alert' })
export class DrugAlertEntity extends BaseEntity {
  @Column({ name: 'tabs', type: 'numeric' })
  tabs: number;

  @Column({ type: 'enum', enum: Takes })
  take: Takes;

  @Column({ type: 'enum', enum: Time })
  time: Time;

  @OneToOne(
    () => DrugCurrentlyUsedEntity,
    (drugCurrentlyUsed) => drugCurrentlyUsed.drugAlert,
    // { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  ) // specify inverse side as a second parameter
  drugCurrentlyUsed: DrugCurrentlyUsedEntity;
}
