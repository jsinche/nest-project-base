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
  Req,
} from '@nestjs/common';
import { DemosService } from './demos.service';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TenantService } from 'src/tenants/tenant.service';

@Controller('demos')
export class DemosController {
  constructor(
    private readonly demosService: DemosService,
    private readonly tenantService: TenantService,
  ) {}

  @Post('pruebitas')
  pruebitas(@Req() req: Request) {
    const tenant = req['tenant'];
    return this.demosService.pruebitas(tenant);
  }
  @Post()
  create(@Body() createDemoDto: CreateDemoDto) {
    return this.demosService.create(createDemoDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.demosService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.demosService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDemoDto: UpdateDemoDto,
  ) {
    return this.demosService.update(id, updateDemoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.demosService.remove(id);
  }
}
