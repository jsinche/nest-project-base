import { Controller, Get, Query } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';
import { GetLogsByTypeDto } from './dto/get-logs-by-type.dto';

@Controller('custom-logger')
export class CustomLoggerController {
  constructor(private readonly customLoggerService: CustomLoggerService) {}
  @Get()
  findAll(@Query() getLogsByTypeDto: GetLogsByTypeDto) {
    return this.customLoggerService.getLogsByType(getLogsByTypeDto);
  }
}
