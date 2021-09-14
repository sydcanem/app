import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartProductDto } from './dto/cart.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a new cart',
  })
  create(@Req() req) {
    return this.cartService.create(req.user);
  }

  @Get()
  @ApiOperation({
    summary: 'Get user cart',
  })
  findByUser(@Req() req) {
    return this.cartService.findByUserId(req.user.id);
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
  update(@Param('id') id: string, @Body() createCartProduct: CreateCartProductDto) {
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
