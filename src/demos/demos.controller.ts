import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { DemosService } from './demos.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('demos')
export class DemosController {
  constructor(private readonly demosService: DemosService) {}

  @Post()
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demosService.create(createDemoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.demosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.demosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demosService.update(+id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.demosService.remove(id);
  }
}
