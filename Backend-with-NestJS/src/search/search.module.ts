import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugRepository } from 'src/pkg/dal/drug/drug.repository';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [TypeOrmModule.forFeature([DrugRepository])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
