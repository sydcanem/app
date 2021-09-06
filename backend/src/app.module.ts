import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Cart, CartProduct } from './cart/entities/cart.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Product, CartProduct, Cart, Auth],
      synchronize: true, // never use in production,
      logging: ['query', 'error'],
    }),
    ProductsModule,
    CartModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
