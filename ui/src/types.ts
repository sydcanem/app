export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency?: string;
  image?: string;
  quantity?: number;
}

export interface CartProduct {
  productId: string;
  quantity: number;
  cartId: string;
}

export interface Cart {
  id: string;
  products: CartProduct[];
}
