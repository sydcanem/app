export interface ICartProduct {
  productId: string;
  quantity: number;
  cartId: string;
}

export interface ICart {
  products?: ICartProduct[];
}
