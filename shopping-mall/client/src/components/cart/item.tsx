import { ForwardedRef, forwardRef, SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { UPDATE_CART, CartGraphql, DELETE_CART } from '../../graphql/cart';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';
import ItemInfo from './itemInfo';

const CartItem = (
  { id, product: { imageUrl, price, title }, amount }: CartGraphql,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();

  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        const { cart: prevCart } = queryClient.getQueryData<{
          cart: CartGraphql[];
        }>(QueryKeys.CART);
        const updateCartIdx = prevCart.findIndex((cart) => cart.id === id);

        if (!prevCart || updateCartIdx < 0) return prevCart;

        const newCart = [...prevCart];
        newCart.splice(updateCartIdx, 1, {
          ...prevCart[updateCartIdx],
          amount,
        });

        queryClient.setQueryData(QueryKeys.CART, { cart: newCart });

        return newCart;
      },
      onSuccess: ({ updateCart }) => {
        const { cart: prevCart } = queryClient.getQueryData<{
          cart: CartGraphql[];
        }>(QueryKeys.CART);

        const updateCartIdx = prevCart.findIndex(
          (cart) => cart.id === updateCart.id
        );

        if (!prevCart || updateCartIdx < 0) return;

        const newCart = [...prevCart];
        newCart.splice(updateCartIdx, 1, updateCart);
        queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
      },
    }
  );

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART);
      },
    }
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    console.log(id, amount);
    updateCart({ id, amount });
  };

  const heandleDeleteImte = () => {
    deleteCart({ id });
  };
  return (
    <li className='cart-item'>
      <input
        type='checkbox'
        className='cart-item__checkbox'
        name='select-item'
        ref={ref}
        data-id={id}
      />
      <ItemInfo imageUrl={imageUrl} price={price} title={title} />
      <input
        type='number'
        className='cart-item__amount'
        value={amount}
        onChange={handleUpdateAmount}
      />
      <button
        type='button'
        className='cart-item__delete-btn'
        onClick={heandleDeleteImte}
      >
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
