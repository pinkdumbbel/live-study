import { useQuery } from 'react-query';
import ProductList from '../../components/product/list';
import { GET_PRODUCTS, ProductsGraphql } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const ProductsListPage = () => {
  const { data } = useQuery<ProductsGraphql>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher(GET_PRODUCTS)
  );

  return (
    <div>
      <h2>상품목록</h2>
      <ProductList productList={data?.products || []} />
    </div>
  );
};

export default ProductsListPage;
