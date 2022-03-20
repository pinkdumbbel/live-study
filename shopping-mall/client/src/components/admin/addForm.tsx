import { SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { CartGraphql, UPDATE_CART } from '../../graphql/cart';
import { ADD_PRODUCT } from '../../graphql/products';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';

const AddForm = () => {
  const queryClient = getClient();

  const { mutate: addProduct } = useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      graphqlFetcher(ADD_PRODUCT, { id, amount })
  );
  /* {
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
 */

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    console.dir([...formData]);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        상품명: <input name='title' type='text' required />
      </label>
      <label>
        이미지URL: <input name='imageUrl' type='text' required />
      </label>
      <label>
        가격: <input name='price' type='number' required min='1000' />
      </label>
      <label>
        상세: <textarea name='description' />
      </label>
      <button type='submit'>등록</button>
    </form>
  );
};

export default AddForm;
