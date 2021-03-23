import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartProductDto, UpdateCartProductDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new cart',
  })
  create() {
    return this.cartService.create();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get cart by id',
  })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Adds a product in the cart by id',
  })
  update(
    @Param('id') id: string,
    @Body() createCartProduct: CreateCartProductDto,
  ) {
    return this.cartService.addProductToCart(id, createCartProduct);
  }

  @ApiOperation({
    summary: 'Deletes a cart by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
