import { useQuery } from 'react-query';
import ProductItem from '../../components/product/item';
import {
  GET_PRODUCTS,
  ProductGraphql,
  ProductsGraphql,
} from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const ProductsList = () => {
  const { data } = useQuery<ProductsGraphql>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher(GET_PRODUCTS)
  );

  return (
    <div>
      <h2>상품목록</h2>
      <ul className='products'>
        {data?.products?.map((product: ProductGraphql) => {
          return <ProductItem key={product.id} {...product} />;
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
