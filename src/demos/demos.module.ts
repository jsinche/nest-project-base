import { Module } from '@nestjs/common';
import { DemosService } from './demos.service';
import { DemosController } from './demos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demo } from './entities/demo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [DemosController],
  providers: [DemosService],
  imports: [TypeOrmModule.forFeature([Demo]), AuthModule],
})
export class DemosModule {}
