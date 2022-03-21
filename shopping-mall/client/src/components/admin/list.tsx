import { ProductsGraphql } from '../../graphql/products';
import AdminItem from './item';

const AdminList = ({
  productList,
  editingIndex,
  setEditingIndex,
  doneEdit,
}: {
  productList: ProductsGraphql[];
  editingIndex: number | null;
  setEditingIndex: (index: number) => void;
  doneEdit: () => void;
}) => {
  return (
    <ul className='products'>
      {productList.map((page) =>
        page.products.map((product, i) => {
          return (
            <AdminItem
              key={product.id}
              {...product}
              isEditing={editingIndex === i}
              setEditingIndex={() => setEditingIndex(i)}
              doneEdit={doneEdit}
            />
          );
        })
      )}
    </ul>
  );
};

export default AdminList;
