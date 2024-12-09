import { Module } from '@nestjs/common';
import { DemosService } from './demos.service';
import { DemosController } from './demos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DemosController],
  providers: [DemosService],
  imports: [TypeOrmModule.forFeature([DemosService])],
})
export class DemosModule {}
