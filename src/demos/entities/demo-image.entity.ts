import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Demo } from './demo.entity';

@Entity({ name: 'demo_images' })
export class DemoImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Demo, (demo) => demo.images, { onDelete: 'CASCADE' })
  demo: Demo;
}
