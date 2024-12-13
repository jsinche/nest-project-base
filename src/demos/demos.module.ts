import { Module } from '@nestjs/common';
import { DemosService } from './demos.service';
import { DemosController } from './demos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demo } from './entities/demo.entity';
import { SharedModule } from 'src/tenants/tenant.module';

@Module({
  controllers: [DemosController],
  providers: [DemosService],
  imports: [TypeOrmModule.forFeature([Demo]), SharedModule],
})
export class DemosModule {}
