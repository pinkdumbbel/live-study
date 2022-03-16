import { useQuery } from 'react-query';
import CartList from '../../components/cart';
import { CartGraphql, GET_CART } from '../../graphql/cart';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const CartPage = () => {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
    cacheTime: 0,
    staleTime: 0,
  });

  const cartItems = (data?.cart || []) as CartGraphql[];

  if (!cartItems.length) return <div>장바구니가 비었어요</div>;

  return <CartList items={cartItems} />;
};

export default CartPage;
