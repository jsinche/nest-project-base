import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemosService } from './demos.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';

@Controller('demos')
export class DemosController {
  constructor(private readonly demosService: DemosService) {}

  @Post()
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demosService.create(createDemoDto);
  }

  @Get()
  findAll() {
    return this.demosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoDto: UpdateDemoDto) {
    return this.demosService.update(+id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demosService.remove(+id);
  }
}
