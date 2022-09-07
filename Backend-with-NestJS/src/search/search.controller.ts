import { Controller, Get, Query } from '@nestjs/common';
import { DrugEntity } from 'src/pkg/dal/drug/drug.entity';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  getDrugs(): Promise<DrugEntity[]> {
    return this.searchService.getDrugs();
  }
  @Get()
  searchDrug(@Query('search') search: string) {
    return this.searchService.searchDrug(search);
  }
}
