import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
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
      await this.demoRepository.save(demo);
      return demo;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    return await this.demoRepository.find();
  }

  async findOne(id: string) {
    const demo = await this.demoRepository.findOneBy({ id });
    if (!demo) throw new NotFoundException(`Demo with id ${id} not found`);
    return demo;
  }

  update(id: number, updateDemoDto: UpdateDemoDto) {
    return `This action updates a #${id} demo`;
  }

  async remove(id: string) {
    return await this.demoRepository.delete({ id });
  }

  private handleDBExceptions(error: any) {
    this.customLoggerService.error(DemosService.name, JSON.stringify(error));
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(
      'Unexpected errorm check server logs',
    );
  }
}
