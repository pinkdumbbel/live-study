import { ProductGraphql, ProductsGraphql } from '../../graphql/products';
import ProductItem from './item';

const ProductList = ({ productList }: { productList: ProductsGraphql[] }) => {
  return (
    <ul className='products'>
      {productList.map((page) =>
        page.products.map((product) => {
          return <ProductItem key={product.id} {...product} />;
        })
      )}
      {/* {productList.products.map((product: ProductGraphql) => {
        return <ProductItem key={product.id} {...product} />;
      })} */}
    </ul>
  );
};

export default ProductList;
