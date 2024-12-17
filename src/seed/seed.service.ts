import { Injectable } from '@nestjs/common';
import { DemosService } from 'src/demos/demos.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly demosService: DemosService) {}
  async runSeed() {
    await this.insertNewDemos();
    return 'This action runs the seed';
  }
  private async insertNewDemos() {
    await this.demosService.deleteAllDemos();
    const products = initialData.products;
    const insertPromises = [];
    products.forEach((product) => {
      insertPromises.push(this.demosService.create(product));
    });
    await Promise.all(insertPromises);
    return true;
  }
}
