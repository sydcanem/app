import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCartProductDto {
  @ApiProperty({
    description: 'The id of product added to the cart',
    required: true,
    type: String,
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'The product quantity',
    required: true,
    type: Number,
  })
  @IsNumber()
  quantity: number;
}

export class UpdateCartProductDto extends PartialType(CreateCartProductDto) {}
