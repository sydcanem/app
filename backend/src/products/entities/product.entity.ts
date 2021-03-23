import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../dto/product.interface';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  currency: string;

  @Column({ nullable: true })
  image?: string;
}
