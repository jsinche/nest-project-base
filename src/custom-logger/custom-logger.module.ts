import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';
import { CustomLoggerController } from './custom-logger.controller';

@Global()
@Module({
  controllers: [CustomLoggerController],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
