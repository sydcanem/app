import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateCartProductDto } from './dto/cart.dto';
import { Cart, CartProduct } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,

    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(user: User) {
    const cart = this.cartRepository.create({
      userId: user.id,
    });
    return this.cartRepository.save(cart);
  }

  async addProductToCart(id: string, createCartProduct: CreateCartProductDto) {
    const cart = await this.cartRepository.findOne(id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }

    const product = await this.productRepository.findOne(createCartProduct.productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${createCartProduct.productId} not found`);
    }

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CartProduct)
      .values({ cartId: id, ...createCartProduct })
      .onConflict(`("cart_id", "product_id") DO UPDATE SET "quantity" = :quantity`)
      .setParameter('quantity', createCartProduct.quantity)
      .execute();

    return this.cartRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  findOne(id: string) {
    return this.cartRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  findByUserId(userId: string) {
    return this.cartRepository.findOne({
      where: { userId },
      order: { dateAdded: 'DESC' },
    });
  }

  remove(id: string) {
    return this.cartRepository.delete(id);
  }
}
