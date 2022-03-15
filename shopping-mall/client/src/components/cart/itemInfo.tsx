import { CartInfo } from '../../graphql/cart';

const ItemInfo = ({ imageUrl, price, title }: CartInfo) => {
  return (
    <>
      <img className='cart-item__image' src={imageUrl} />
      <p className='cart-item__price'>{price}</p>
      <p className='cart-item__title'>{title}</p>
    </>
  );
};

export default ItemInfo;
