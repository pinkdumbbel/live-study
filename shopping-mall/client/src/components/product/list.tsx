import { ProductGraphql } from '../../graphql/products';
import ProductItem from './item';

const ProductList = ({ productList }: { productList: ProductGraphql[] }) => {
  return (
    <ul className='products'>
      {productList?.map((product: ProductGraphql) => {
        return <ProductItem key={product.id} {...product} />;
      })}
    </ul>
  );
};

export default ProductList;
