import React from 'react';
import { useCustomerProducts } from '../hooks';
import { Product } from '../types';
import { ProductItem } from './ProductItems';

interface Props {
  id: string | null
}

export const ProductList = ({ id }: Props) => {
  const { data: products } = useCustomerProducts(id);

  return (
    <>
      {products && products.length > 0 && products?.map((product: Product) => (
        <ProductItem key={product.id} cartId={id} product={product} />
      ))}
      {products && products.length === 0 &&
        <h2 className="text-xl font-medium text-center py-10">
          No products found in database. Run <pre>npx ts-node ./node_modules/typeorm/cli.js migration:run</pre> in terminal inside backend folder to preload products.
        </h2>
      }
    </>
  );
};
