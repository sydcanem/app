import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ICart, ICartProduct } from '../dto/cart.interface';
import { Product } from '../../products/entities/product.entity';

@Entity()
@Index(['productId', 'cartId'], { unique: true })
export class CartProduct implements ICartProduct {
  @PrimaryColumn()
  @ManyToOne((type) => Product)
  @JoinColumn({
    name: 'productId',
    referencedColumnName: 'id',
  })
  productId: string;

  @Column()
  quantity: number;

  @PrimaryColumn()
  @ManyToOne((type) => Cart)
  @JoinColumn({
    name: 'cartId',
    referencedColumnName: 'id',
  })
  cartId: string;
}

@Entity()
export class Cart implements ICart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany((type) => CartProduct, (products) => products.cartId)
  products: CartProduct[];
}
