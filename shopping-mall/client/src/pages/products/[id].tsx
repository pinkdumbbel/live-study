import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/product/detail';
import { GET_PRODUCT, ProductGraphql } from '../../graphql/products';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import { Product } from '../../types';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data } = useQuery<{ product: ProductGraphql }>(
    [QueryKeys.PRODUCTS, id],
    () => graphqlFetcher(GET_PRODUCT, { id })
  );

  if (!data) return null;
  return (
    <div>
      <h2>상품상세</h2>
      <ProductDetail item={data.product} />;
    </div>
  );
};

export default ProductDetailPage;
