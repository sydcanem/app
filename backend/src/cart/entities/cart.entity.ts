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
import { User } from 'src/users/entities/user.entity';

@Entity()
@Index(['productId', 'cartId'], { unique: true })
export class CartProduct implements ICartProduct {
  @PrimaryColumn({ name: 'product_id' })
  @ManyToOne((type) => Product)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'id',
  })
  productId: string;

  @Column()
  quantity: number;

  @PrimaryColumn({ name: 'cart_id' })
  @ManyToOne(() => Cart)
  @JoinColumn({
    name: 'cart_id',
    referencedColumnName: 'id',
  })
  cartId: string;
}

@Entity()
export class Cart implements ICart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => CartProduct, (products) => products.cartId)
  products: CartProduct[];

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  userId: string;

  @Column({
    name: 'date_added',
    type: 'timestamp with time zone',
    default: 'now()',
  })
  dateAdded: Date;
}
