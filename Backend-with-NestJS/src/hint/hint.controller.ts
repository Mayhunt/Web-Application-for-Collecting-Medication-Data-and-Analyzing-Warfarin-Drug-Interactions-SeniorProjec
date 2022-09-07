import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HintEntity } from 'src/pkg/dal/hint/hint.entity';
import { CreateHintDto } from './dto/create-hint.dto';
import { HintService } from './hint.service';

@Controller('hint')
export class HintController {
  constructor(private hintService: HintService) {}
  @Post()
  createHint(
    // @User() user: UserEntity,
    @Body() createHintDto: CreateHintDto,
  ): Promise<HintEntity> {
    // console.log(user);
    return this.hintService.createHint(createHintDto);
  }

  @Get()
  getHints(): Promise<HintEntity[]> {
    // console.log(user);
    return this.hintService.getHint();
  }

  @Get(':id')
  getHintById(@Param('id') id: string): Promise<HintEntity> {
    return this.hintService.getHintById(id);
  }

  //   @Patch(':id/update')
  //   updateInr(
  //     @Param('id') id: string,
  //     @Body() updateInrDto: UpdateInrDto,
  //     @User() user: UserEntity,
  //   ): Promise<HintEntity> {
  //     return this.hintService.updateHint(id, updateHintDto, user);
  //   }

  //   @Delete(':id/delete')
  //   deleteHint(
  //     @Param('id') id: string,
  //     @User() user: UserEntity,
  //   ): Promise<HintEntity> {
  //     return this.hintService.deleteHint(id, user);
  //   }
}
