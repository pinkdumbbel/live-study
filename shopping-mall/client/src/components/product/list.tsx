import { ProductGraphql, ProductsGraphql } from '../../graphql/products';
import ProductItem from './item';

const ProductList = ({
  productList,
  Item,
}: {
  productList: ProductsGraphql[];
  Item: ({ id, imageUrl, price, title }: ProductGraphql) => JSX.Element;
}) => {
  return (
    <ul className='products'>
      {productList.map((page) =>
        page.products.map((product) => {
          return <Item key={product.id} {...product} />;
        })
      )}
    </ul>
  );
};

export default ProductList;
