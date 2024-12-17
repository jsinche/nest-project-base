import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { DemosModule } from 'src/demos/demos.module';

@Module({
  imports: [DemosModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
