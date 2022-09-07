import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { DrugAlertRepository } from 'src/pkg/dal/drug-alert/drug-alert.repository';
import { HintEntity } from 'src/pkg/dal/hint/hint.entity';
import { HintRepository } from 'src/pkg/dal/hint/hint.repository';
import { CreateHintDto } from './dto/create-hint.dto';

@Injectable()
export class HintService {
  constructor(
    @InjectRepository(HintRepository)
    private hintRepository: HintRepository,
  ) {}

  async createHint(createHintDto: CreateHintDto): Promise<HintEntity> {
    const { hint } = createHintDto;
    const hints = this.hintRepository.create({
      hint,
    });
    await this.hintRepository.save(hints);
    return hints;
  }

  async getHint(): Promise<HintEntity[]> {
    const hint = await this.hintRepository.find();
    return hint;
  }

  async getHintById(id: string): Promise<HintEntity> {
    const hint = await this.hintRepository.findOneOrFail(id);
    return hint;
  }
}
