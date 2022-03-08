import { useQuery } from 'react-query';
import ProductItem from '../../components/product/item';
import { fetcher, QueryKeys } from '../../queryClient';
import { Product } from '../../types';

const ProductsList = () => {
  const { data } = useQuery(QueryKeys.PRODUCTS, () =>
    fetcher({ method: 'GET', path: '/products' })
  );

  return (
    <div>
      <h2>상품목록</h2>
      <ul className='products'>
        {data?.map((product: Product) => {
          return <ProductItem {...product} key={product.id} />;
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
