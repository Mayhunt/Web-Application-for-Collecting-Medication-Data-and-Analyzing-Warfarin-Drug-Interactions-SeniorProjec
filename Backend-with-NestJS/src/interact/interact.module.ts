import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugInteractionRepository } from 'src/pkg/dal/drug-interaction/drug-interaction.repository';
import { InteractController } from './interact.controller';
import { InteractService } from './interact.service';

@Module({
  imports: [TypeOrmModule.forFeature([DrugInteractionRepository])],
  providers: [InteractService],
  controllers: [InteractController],
})
export class InteractModule {}
