import { ForwardedRef, forwardRef, RefObject, SyntheticEvent } from 'react';
import { QueryClient, useMutation } from 'react-query';
import { UPDATE_CART, CartGraphql, DELETE_CART } from '../../graphql/cart';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';

const CartItem = (
  { id, imageUrl, price, title, amount }: CartGraphql,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const queryClient = getClient();

  const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: async ({ id, amount }) => {
        const prevCart = queryClient.getQueryData<{
          [key: string]: CartGraphql;
        }>(QueryKeys.CART);

        if (!prevCart?.[id]) return prevCart;
        const newCart = {
          ...(prevCart || {}),
          [id]: {
            ...prevCart[id],
            amount,
          },
        };

        queryClient.setQueryData(QueryKeys.CART, newCart);

        return prevCart;
      },
      onSuccess: (newCartItem) => {
        const prevCart = queryClient.getQueryData<{
          [key: string]: CartGraphql;
        }>(QueryKeys.CART);

        const newCart = {
          ...(prevCart || {}),
          [id]: newCartItem,
        };

        queryClient.setQueryData(QueryKeys.CART, newCart);
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
      />
      <img className='cart-item__image' src={imageUrl} />
      <p className='cart-item__price'>{price}</p>
      <p className='cart-item__title'>{title}</p>
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
