import { Link } from 'react-router-dom';
import { ProductGraphql } from '../../graphql/products';

const ProductItem = ({
  id,
  imageUrl,
  price,
  description,
  title,
  createdAt,
}: ProductGraphql) => {
  return (
    <li className='product-item'>
      <Link to={`/products/${id}`}>
        <p className='product-item__title'>{title}</p>
        <img className='product-item__image' src={imageUrl} />
        <span className='product-item__price'>${price}</span>
      </Link>
    </li>
  );
};

export default ProductItem;
