import { SyntheticEvent } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  DELETE_PRODUCT,
  ProductGraphql,
  UPDATE_PROCUT,
} from '../../graphql/products';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';
import { checkedCartState } from '../../recolis/cart';
import arrToObj from '../../util/arrToObj';

const AdminItem = ({
  id,
  imageUrl,
  price,
  title,
  createdAt,
  isEditing,
  description,
  setEditingIndex,
  doneEdit,
}: ProductGraphql & {
  isEditing: boolean;
  setEditingIndex: () => void;
  doneEdit: () => void;
}) => {
  const [checkedCartItems, setCheckedCartItems] =
    useRecoilState(checkedCartState);
  const queryClient = getClient();

  const { mutate: updateProduct } = useMutation(
    ({
      title,
      imageUrl,
      price,
      description,
    }: Omit<ProductGraphql, 'createAt'>) =>
      graphqlFetcher(UPDATE_PROCUT, {
        id,
        title,
        imageUrl,
        price,
        description,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });

        doneEdit();
      },
    }
  );

  const { mutate: deleteProduct } = useMutation(
    ({ id }: Pick<ProductGraphql, 'id'>) => {
      return graphqlFetcher(DELETE_PRODUCT, { id });
    },
    {
      //deleteProduct는 삭제된 상품의 id
      onSuccess: ({ deleteProduct }) => {
        setCheckedCartItems(
          checkedCartItems.filter((item) => item.product.id !== deleteProduct)
        );

        queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
          exact: false,
          refetchInactive: true,
        });
      },
    }
  );

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = arrToObj([...new FormData(e.target as HTMLFormElement)]);
    formData.price = Number(formData.price);
    updateProduct(formData as Omit<ProductGraphql, 'createAt'>);
  };

  const onDlete = () => {
    deleteProduct({ id });
  };
  if (isEditing) {
    return (
      <li className='product-item'>
        <form onSubmit={onSubmit}>
          <label>
            상품명:{' '}
            <input name='title' type='text' required defaultValue={title} />
          </label>
          <label>
            이미지URL:{' '}
            <input
              name='imageUrl'
              type='text'
              required
              defaultValue={imageUrl}
            />
          </label>
          <label>
            가격:{' '}
            <input
              name='price'
              type='number'
              required
              min='1000'
              defaultValue={price}
            />
          </label>
          <label>
            상세: <textarea name='description' defaultValue={description} />
          </label>
          <button type='submit'>수정</button>
        </form>
      </li>
    );
  }

  return (
    <li className='product-item'>
      <Link to={`/products/${id}`}>
        <p className='product-item__title'>{title}</p>
        <img className='product-item__image' src={imageUrl} />
        <span className='product-item__price'>₩{price}</span>
      </Link>
      {!createdAt && <span>삭제된 상품</span>}
      <button onClick={setEditingIndex}>수정</button>
      <button onClick={onDlete}>삭제</button>
    </li>
  );
};

export default AdminItem;
