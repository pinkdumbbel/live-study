import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import ProductList from '../../components/product/list';
import { GET_PRODUCTS, ProductsGraphql } from '../../graphql/products';
import useIntersection from '../../hooks/useIntersection';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const ProductsListPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>();

  const intersecting = useIntersection(fetchMoreRef);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useInfiniteQuery<ProductsGraphql>(
      [QueryKeys.PRODUCTS, 'product'],
      ({ pageParam = '' }) =>
        graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          return lastPage.products[lastPage.products.length - 1]?.id;
        },
      }
    );
  useEffect(() => {
    if (!intersecting || !hasNextPage || isFetchingNextPage || !isSuccess)
      return;
    fetchNextPage();
  }, [intersecting]);

  return (
    <div>
      <h2>상품목록</h2>
      <ProductList productList={data?.pages || []} />
      <div ref={fetchMoreRef} /* style={{ height: '1px' }} */></div>
    </div>
  );
};

export default ProductsListPage;
