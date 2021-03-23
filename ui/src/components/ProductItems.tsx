import React, { useEffect, useState } from 'react';
import { requestUpdateProductQuantity } from '../services';
import { Product } from '../types';

interface Props {
  cartId: string | null;
  product: Product
};

export const ProductItem = ({ cartId, product }: Props) => {
  const [ quantity, setQuantity ] = useState(0);
  const onQuantityChange = (quantity: number) => {
    // quantity should not be less than -1
    if (!(quantity - 1 < -1)) {
      requestUpdateProductQuantity(cartId, product.id, quantity);
    }
  };

  useEffect(() => {
    setQuantity(product.quantity ?? 0);
  }, [product.quantity]);

  return (
    <div className="flex justify-between items-center mt-6 pt-6">
      <div className="flex items-center">
        <img
          src={product.image}
          width="60"
          alt={product.title}
        />
        <div className="flex flex-col ml-3">
          <span className="md:text-md font-medium">{product.title}</span>
          <span className="text-xs font-light text-gray-400">
            {product.description}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="px-4 flex ">
          <span
            className="px-2 font-semibold cursor-pointer select-none"
            onClick={() => onQuantityChange(quantity - 1)}>-</span>
          <input
            type="text"
            className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm text-center"
            value={quantity}
            onChange={({ target: { value }}) => {
              const newValue = parseInt(value);

              if (!isNaN(newValue)) {
                setQuantity(newValue);
                onQuantityChange(newValue);
              }
            }}
          />
          <span
            className="px-2 font-semibold cursor-pointer select-none"
            onClick={() => onQuantityChange(quantity + 1)}>+</span>
        </div>
        <div className="px-4">
          <span className="text-xs font-medium">${product.price}</span>
        </div>
      </div>
    </div>
  );
};
