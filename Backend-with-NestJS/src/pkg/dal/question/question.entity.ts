import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { HintEntity } from '../hint/hint.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'question' })
export class QuestionEntity extends BaseEntity {
  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @OneToOne(() => HintEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  hintt: HintEntity;

  @ManyToOne(() => UserEntity, (user) => user.questions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
