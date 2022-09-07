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
import { InrEntity } from 'src/pkg/dal/inr/inr.entity';
import { UserEntity } from 'src/pkg/dal/user/user.entity';
import { User } from 'src/pkg/decorator/user.decorator';
import { JwtAuthGuard } from 'src/pkg/guard/jwt-auth.guard';
import { CreateInrDto } from './dto/create-inr.dto';
import { UpdateInrDto } from './dto/update-inr.dto';
import { InrService } from './inr.service';

@Controller('inr')
@UseGuards(JwtAuthGuard)
export class InrController {
  constructor(private inrService: InrService) {}

  @Post()
  createInr(
    @User() user: UserEntity,
    @Body() createInrDto: CreateInrDto,
  ): Promise<InrEntity> {
    // console.log(user);
    return this.inrService.createInr(createInrDto, user);
  }

  @Get()
  getInrs(@User() user: UserEntity): Promise<InrEntity[]> {
    // console.log(user);
    return this.inrService.getInrs(user);
  }

  @Get(':id')
  getInrById(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<InrEntity> {
    return this.inrService.getInrById(id, user);
  }

  @Patch(':id/update')
  updateInr(
    @Param('id') id: string,
    @Body() updateInrDto: UpdateInrDto,
    @User() user: UserEntity,
  ): Promise<InrEntity> {
    return this.inrService.updateInr(id, updateInrDto, user);
  }

  @Delete(':id/delete')
  deleteInr(
    @Param('id') id: string,
    @User() user: UserEntity,
  ): Promise<InrEntity> {
    return this.inrService.deleteInr(id, user);
  }
}
