import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugCurrentlyUsedRepository } from 'src/pkg/dal/drug-currently-used/drug-currently-used.repository';
import { DrugRepository } from 'src/pkg/dal/drug/drug.repository';
import { CurrentlyDrugController } from './currently-drug.controller';
import { CurrentlyDrugService } from './currently-drug.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DrugCurrentlyUsedRepository]),
    TypeOrmModule.forFeature([DrugRepository]),
  ],
  controllers: [CurrentlyDrugController],
  providers: [CurrentlyDrugService],
})
export class CurrentlyDrugModule {}
