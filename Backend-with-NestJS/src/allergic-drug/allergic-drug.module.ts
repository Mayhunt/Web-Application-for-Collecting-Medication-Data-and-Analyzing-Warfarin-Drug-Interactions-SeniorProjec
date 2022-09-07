import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllergicDrugUsedRepository } from 'src/pkg/dal/allergic-drug-used/allergic-drug-used.repository';
import { DrugRepository } from 'src/pkg/dal/drug/drug.repository';
import { AllergicDrugController } from './allergic-drug.controller';
import { AllergicDrugService } from './allergic-drug.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllergicDrugUsedRepository]),
    TypeOrmModule.forFeature([DrugRepository]),
  ],
  controllers: [AllergicDrugController],
  providers: [AllergicDrugService],
})
export class AllergicDrugModule {}
