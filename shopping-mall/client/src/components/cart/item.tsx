import { ForwardedRef, forwardRef, SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { UPDATE_CART, CartGraphql, DELETE_CART } from '../../graphql/cart';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';
import ItemInfo from './itemInfo';

const CartItem = (
  { id, product: { imageUrl, price, title, createdAt }, amount }: CartGraphql,
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
        }>(QueryKeys.CART) || { cart: [] };
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
        }>(QueryKeys.CART) || { cart: [] };

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
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { cartId: id }),
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

  const heandleDeleteItem = () => {
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
        disabled={!createdAt}
      />
      <ItemInfo imageUrl={imageUrl} price={price} title={title} />
      {createdAt ? (
        <input
          type='number'
          className='cart-item__amount'
          value={amount}
          onChange={handleUpdateAmount}
        />
      ) : (
        <div>삭제된 상품입니다.</div>
      )}

      <button
        type='button'
        className='cart-item__delete-btn'
        onClick={heandleDeleteItem}
      >
        삭제
      </button>
    </li>
  );
};

export default forwardRef(CartItem);
