import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import AddForm from '../../components/admin/addForm';
import AdminItem from '../../components/admin/item';
import ProductList from '../../components/product/list';
import { GET_PRODUCTS, ProductsGraphql } from '../../graphql/products';
import useIntersection from '../../hooks/useIntersection';
import { graphqlFetcher, QueryKeys } from '../../queryClient';

const AdminPage = () => {
  const fetchMoreRef = useRef<HTMLDivElement>();
  const intersecting = useIntersection(fetchMoreRef);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useInfiniteQuery<ProductsGraphql>(
      [QueryKeys.PRODUCTS, true],
      ({ pageParam = 0 }) =>
        graphqlFetcher(GET_PRODUCTS, { cursor: pageParam, showDeleted: true }),
      {
        getNextPageParam: (_, pages) => {
          const nextCursor = pages.reduce((prev, cur) => {
            return cur.products.length > 0
              ? prev + cur.products.length
              : cur.products.length;
          }, 0);

          return nextCursor === 0 ? false : nextCursor;
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
      <AddForm />
      <ProductList productList={data?.pages || []} Item={AdminItem} />
      <div ref={fetchMoreRef}></div>
    </div>
  );
};

export default AdminPage;
