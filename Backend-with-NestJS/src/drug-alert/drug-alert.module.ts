import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugAlertRepository } from 'src/pkg/dal/drug-alert/drug-alert.repository';
import { DrugCurrentlyUsedRepository } from 'src/pkg/dal/drug-currently-used/drug-currently-used.repository';
import { DrugAlertController } from './drug-alert.controller';
import { DrugAlertService } from './drug-alert.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DrugAlertRepository]),
    TypeOrmModule.forFeature([DrugCurrentlyUsedRepository]),
  ],
  providers: [DrugAlertService],
  controllers: [DrugAlertController],
})
export class DrugAlertModule {}
