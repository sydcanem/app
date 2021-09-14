import { useEffect, useState } from 'react';
import { ProductList } from '../components/ProductList';
import { SummaryFooter } from '../components/SummaryFooter';
import { getUserCarts, requestCreateCart } from '../services';

export const Cart = () => {
  const [ cartId, setCartId ] = useState<string | null>(null);

  useEffect(() => {
    const initCart = async (id: string | null) => {
      const userCarts = await getUserCarts();
      if (!id) {
        const resp = await requestCreateCart();
        if (resp && resp.id) {
          window.localStorage.setItem('cartId', resp.id);
          setCartId(resp.id);
        }
      } else {
        const id = window.localStorage.getItem('cartId');
        setCartId(id);
      }
    }

    initCart(window.localStorage.getItem('cartId'));
  }, []);

  return (
    <div className="w-full p-4 px-5 py-5">
      <div className="md:grid md:grid-cols-3 gap-2 ">
        <div className="col-span-3 p-5">
          <h1 className="text-xl font-medium">Shopping Cart</h1>
          <ProductList id={cartId} />
          <SummaryFooter id={cartId} />
        </div>
      </div> 
    </div>
  )
};
