import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Demo } from './entities/demo.entity';
import { Repository } from 'typeorm';
import { CustomLoggerService } from 'src/custom-logger/custom-logger.service';

@Injectable()
export class DemosService {
  constructor(
    @InjectRepository(Demo)
    private readonly demoRepository: Repository<Demo>,
    private readonly customLoggerService: CustomLoggerService,
  ) {}
  async create(createDemoDto: CreateDemoDto) {
    try {
      const demo = this.demoRepository.create(createDemoDto);
      throw new UnauthorizedException('Probando si se borra 112312');
      await this.demoRepository.save(demo);
      return demo;
    } catch (error) {
      console.log(JSON.stringify(error));
      this.customLoggerService.error(DemosService.name, JSON.stringify(error));
      throw new InternalServerErrorException('Probando si se borra 2');
    }
  }

  findAll() {
    return `This action returns all demos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demo`;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}
