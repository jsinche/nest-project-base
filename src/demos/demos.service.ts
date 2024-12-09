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

@Injectable()
export class DemosService {
  constructor(
    @InjectRepository(Demo)
    private readonly demoRepository: Repository<Demo>,
  ) {}
  async create(createDemoDto: CreateDemoDto) {
    try {
      const demo = this.demoRepository.create(createDemoDto);
      await this.demoRepository.save(demo);
      return demo;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
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
