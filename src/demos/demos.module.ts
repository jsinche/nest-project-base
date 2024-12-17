import { Module } from '@nestjs/common';
import { DemosService } from './demos.service';
import { DemosController } from './demos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Demo } from './entities/demo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DemoImage } from './entities/demo-image.entity';

@Module({
  controllers: [DemosController],
  providers: [DemosService],
  imports: [TypeOrmModule.forFeature([Demo, DemoImage]), AuthModule],
})
export class DemosModule {}
