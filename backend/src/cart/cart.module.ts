import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartProduct } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct, Cart, Product])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
