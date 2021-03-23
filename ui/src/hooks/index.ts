import { useProducts, useCartProducts } from "../services";

export const useCustomerProducts = (id: string | null) => {
  const { data: products, error: productError } = useProducts();
  const { data: cartProducts, error: cartProductError } = useCartProducts(id);

  // set quantity of products from cart products
  const data =  products?.map(p => {
    const product = cartProducts?.products.find(cp => cp.productId === p.id);

    if (product) {
      p.quantity = product.quantity;
    } else {
      p.quantity = 0;
    }

    return p;
  });

  return {
    data,
    error: productError || cartProductError,
    isLoading: !products || !cartProducts,
  };
};
