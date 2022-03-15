import { ProductGraphql } from '../../graphql/products';
import { Product } from '../../types';

const ProductDetail = ({
  item: { title, imageUrl, description, price },
}: {
  item: ProductGraphql;
}) => (
  <div className='product-detail'>
    <p className='product-detail__title'>{title}</p>
    <img className='product-detail__image' src={imageUrl} />
    <p className='product-detail__description'>{description}</p>
    <span className='product-detail__price'>${price}</span>
  </div>
);

export default ProductDetail;
