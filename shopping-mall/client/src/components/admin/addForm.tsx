import { SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { CartGraphql, UPDATE_CART } from '../../graphql/cart';
import {
  ADD_PRODUCT,
  ProductGraphql,
  ProductsGraphql,
} from '../../graphql/products';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';
import arrToObj from '../../util/arrToObj';

type OmittedProduct = Omit<ProductGraphql, 'id' | 'createAt'>;
const AddForm = () => {
  const queryClient = getClient();

  const { mutate: addProduct } = useMutation(
    ({ title, imageUrl, price, description }: OmittedProduct) =>
      graphqlFetcher(ADD_PRODUCT, { title, imageUrl, price, description }),
    {
      onSuccess: ({ addProduct }) => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });
        /* const data = queryClient.getQueriesData<{
          pageParams: (undefined | number)[];
          pages: ProductsGraphql[];
        }>([QueryKeys.PRODUCTS, 'admin']);

        const [queryKey, { pageParams, pages }] = data[0];

        const newProduct = [...pages];
        newProduct[0].products = [addProduct, ...newProduct[0].products];

        queryClient.setQueriesData(queryKey, { pageParams, pages: newProduct }); */
      },
    }
  );

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);
    addProduct(formData as OmittedProduct);
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
