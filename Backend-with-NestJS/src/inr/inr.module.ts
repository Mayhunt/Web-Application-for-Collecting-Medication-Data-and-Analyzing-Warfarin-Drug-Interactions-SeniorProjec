import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InrRepository } from 'src/pkg/dal/inr/inr.repository';
import { InrController } from './inr.controller';
import { InrService } from './inr.service';

@Module({
  imports: [TypeOrmModule.forFeature([InrRepository])],
  controllers: [InrController],
  providers: [InrService],
})
export class InrModule {}
