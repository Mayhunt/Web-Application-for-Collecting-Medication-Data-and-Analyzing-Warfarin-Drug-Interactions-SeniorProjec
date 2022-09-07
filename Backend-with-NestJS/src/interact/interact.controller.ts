import { Controller, Get } from '@nestjs/common';
import { DrugInteractionEntity } from 'src/pkg/dal/drug-interaction/drug-interaction.entity';
import { InteractService } from './interact.service';

@Controller('interact')
export class InteractController {
  constructor(private interactService: InteractService) {}

  @Get()
  getInteract(): Promise<DrugInteractionEntity[]> {
    return this.interactService.getInteract();
  }
}
