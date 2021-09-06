import useSWR, { mutate } from 'swr';
import { agent } from '../agent';
import { Cart, Product } from '../types';

const fetcher = (url: string, options?: Object) => agent(url, options).then((r) => r.data);

export const useProducts = () => {
  return useSWR<Product[]>('/products', fetcher);
};

export const useCartProducts = (cartId: string | null) => {
  return useSWR<Cart>(cartId ? `/cart/${cartId}` : null, fetcher);
};

export const requestCreateCart = async () => {
  return fetcher('/cart', { method: 'POST' });
};

export const requestUpdateProductQuantity = async (
  cartId: string | null,
  productId: string,
  quantity: number,
) => {
  const update = await fetcher(`/cart/${cartId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    data: JSON.stringify({ cartId, productId, quantity }),
  });
  return mutate(`/cart/${cartId}`, update, false);
};
