import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { GET_PRODUCTS, ProductsGraphql } from '../../graphql/products';
import useIntersection from '../../hooks/useIntersection';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import AddForm from './addForm';
import AdminList from './list';

const Admin = () => {
  const fetchMoreRef = useRef<HTMLDivElement>();
  const intersecting = useIntersection(fetchMoreRef);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useInfiniteQuery<ProductsGraphql>(
      [QueryKeys.PRODUCTS, 'admin'],
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

  const doneEdit = () => {
    setEditingIndex(null);
  };
  useEffect(() => {
    if (!intersecting || !hasNextPage || isFetchingNextPage || !isSuccess)
      return;
    fetchNextPage();
  }, [intersecting]);

  return (
    <>
      <AddForm />
      <AdminList
        productList={data?.pages || []}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        doneEdit={doneEdit}
      />
      <div ref={fetchMoreRef} style={{ height: '1px' }}></div>
    </>
  );
};

export default Admin;
