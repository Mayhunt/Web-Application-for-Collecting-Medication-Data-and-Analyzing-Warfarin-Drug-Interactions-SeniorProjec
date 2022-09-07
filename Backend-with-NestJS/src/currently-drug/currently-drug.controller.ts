import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DrugCurrentlyUsedEntity } from 'src/pkg/dal/drug-currently-used/drug-currently-used.entity';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { User } from 'src/pkg/decorator/user.decorator';
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard';
import { CurrentlyDrugService } from './currently-drug.service';
import { CreateCurrentlyDrugDto } from './dto/create-CurrentlyDrug.dto';
import { UpdateCurrentlyDrugDto } from './dto/update-CurrentlyDrug.dto';

@Controller('currently-drug')
@UseGuards(JwtAuthGuard)
export class CurrentlyDrugController {
  constructor(private currentlyDrugService: CurrentlyDrugService) {}

  @Post()
  createCurrentlyDrug(
    @User() user: UserEntity,
    @Body() createCurrentlyDrugDto: CreateCurrentlyDrugDto,
    // drugAlert: DrugAlertEntity,
  ): Promise<DrugCurrentlyUsedEntity> {
    return this.currentlyDrugService.createCurrentlyDrug(
      createCurrentlyDrugDto,
      user,
      // drugAlert,
    );
  }

  @Get()
  getCurrentlyDrugs(
    @User() user: UserEntity,
  ): Promise<DrugCurrentlyUsedEntity[]> {
    return this.currentlyDrugService.getCurrentlyDrugs(user);
  }

  @Get(':id')
  getCurrentlyDrugById(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<DrugCurrentlyUsedEntity> {
    return this.currentlyDrugService.getCurrentlyDrugById(id, user);
  }

  @Patch(':id/update')
  updateCurrentlyDrug(
    @Param('id') id: string,
    @Body() updateCurrentlyDrugDto: UpdateCurrentlyDrugDto,
    @User() user: UserEntity,
  ): Promise<DrugCurrentlyUsedEntity> {
    return this.currentlyDrugService.updateCurrentlyDrug(
      id,
      updateCurrentlyDrugDto,
      user,
    );
  }

  @Delete(':id/delete')
  deleteCurrentlyDrug(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<DrugCurrentlyUsedEntity> {
    return this.currentlyDrugService.deleteCurrentlyDrug(id, user);
  }
}
