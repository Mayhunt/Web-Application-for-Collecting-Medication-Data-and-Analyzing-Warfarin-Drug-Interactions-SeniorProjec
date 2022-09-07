import { Module } from '@nestjs/common';
import { HintService } from './hint.service';
// import { HintController } from './hint.controller';

@Module({
  providers: [HintService],
  // controllers: [HintController],
})
export class HintModule {}
