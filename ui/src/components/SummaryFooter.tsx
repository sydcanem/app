import React from 'react';
import { useCustomerProducts } from '../hooks';
import { Product } from '../types';

interface Props {
  id: string | null;
}

export const SummaryFooter = ({ id }: Props) => {
  const { data: products } = useCustomerProducts(id);
  const total = products?.reduce((a: number, p: Product) => {
    return a + (p.quantity ? p.price * p.quantity: 0);
  }, 0);

  return (
    <div className="flex justify-between items-center mt-6 pt-6 border-t">
      <div className="flex items-center">
        <i className="fa fa-arrow-left text-sm pr-2"></i>
        <span className="text-md font-medium text-blue-500">
          Sub Total:
        </span>
      </div>
      <div className="flex justify-center items-end">
        <span className="text-md font-bold text-gray-800 ">
          ${total}
        </span>
      </div>
    </div>
  );
};
