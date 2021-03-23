import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IProduct } from './product.interface';

export class CreateProductDto implements IProduct {
  @ApiProperty({
    description: 'Title of the product',
    required: true,
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Product description',
    required: true,
    type: String,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    required: true,
    type: Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Price currency',
    required: true,
    default: 'USD',
    type: String,
  })
  @IsString()
  currency: string;

  @ApiProperty({
    description: 'Product image url',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
