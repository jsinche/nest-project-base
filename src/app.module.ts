import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemosModule } from './demos/demos.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { CommonModule } from './common/common.module';
import typeorm from './config/typeorm';
import { TenantMiddleware } from './middlewares/TenantMiddleware';
import { TenantService } from './tenants/tenant.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    DemosModule,
    CustomLoggerModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, TenantService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
