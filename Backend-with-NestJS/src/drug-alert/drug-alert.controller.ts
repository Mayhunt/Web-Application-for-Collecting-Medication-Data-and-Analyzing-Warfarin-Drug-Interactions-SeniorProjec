import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DrugAlertEntity } from 'src/pkg/dal/drug-alert/drug-alert.entity';
import { DrugAlertService } from './drug-alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Controller('drug-alert')
export class DrugAlertController {
  constructor(private drugAlertService: DrugAlertService) {}

  @Post()
  createDrugAlert(
    @Body() createAlertDto: CreateAlertDto,
    // drugCurrentlyUsed: DrugCurrentlyUsedEntity,
    // @User() user: UserEntity,
  ): Promise<DrugAlertEntity> {
    return this.drugAlertService.createDrugAlert(
      createAlertDto,
      // drugCurrentlyUsed,
    );
  }

  @Get()
  getDrugAlert(): Promise<DrugAlertEntity[]> {
    return this.drugAlertService.getDrugAlert();
  }

  @Patch(':id/update')
  updateDrugAlert(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
  ): Promise<DrugAlertEntity> {
    return this.drugAlertService.updateDrugAlert(id, updateAlertDto);
  }

  @Delete(':id/delete')
  deleteDrugAlert(@Param('id') id: string): Promise<DrugAlertEntity> {
    return this.drugAlertService.deleteDrugAlert(id);
  }
}
