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
import { AllergicDrugUsedEntity } from 'src/pkg/dal/allergic-drug-used/allergic-drug-used.entity';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { User } from 'src/pkg/decorator/user.decorator';
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard';
import { AllergicDrugService } from './allergic-drug.service';
import { CreateAllergicDrugDto } from './dto/create-AllergicDrug.dto';
import { UpdateAllergicDrugDto } from './dto/update-AllergicDrug.dto';

@Controller('allergic-drug')
@UseGuards(JwtAuthGuard)
export class AllergicDrugController {
  constructor(private allergicDrugService: AllergicDrugService) {}

  @Post()
  createAllergicDrug(
    @User() user: UserEntity,
    @Body() createAllergicDrugDto: CreateAllergicDrugDto,
  ): Promise<AllergicDrugUsedEntity> {
    return this.allergicDrugService.createAllergicDrug(
      createAllergicDrugDto,
      user,
    );
  }

  @Get()
  getAllergicDrugs(
    @User() user: UserEntity,
  ): Promise<AllergicDrugUsedEntity[]> {
    return this.allergicDrugService.getAllergicDrugs(user);
  }

  @Get(':id')
  getAllergicDrugById(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<AllergicDrugUsedEntity> {
    return this.allergicDrugService.getAllergicDrugById(id, user);
  }

  @Patch(':id/update')
  updateAllergicDrug(
    @Param('id') id: string,
    @Body() updateAllergicDrugDto: UpdateAllergicDrugDto,
    @User() user: UserEntity,
  ): Promise<AllergicDrugUsedEntity> {
    return this.allergicDrugService.updateAllergicDrug(
      id,
      updateAllergicDrugDto,
      user,
    );
  }

  @Delete(':id/delete')
  deleteAllergicDrug(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<AllergicDrugUsedEntity> {
    return this.allergicDrugService.deleteAllergicDrug(id, user);
  }
}
