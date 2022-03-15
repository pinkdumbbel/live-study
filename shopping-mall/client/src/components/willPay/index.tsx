import { useRecoilValue } from 'recoil';
import { checkedCartState } from '../../recolis/cart';
import ItemInfo from '../cart/itemInfo';
import { SyntheticEvent } from 'react';

const WillPay = ({
  subTitle,
  handleSubmit,
}: {
  subTitle: string;
  handleSubmit: (e: SyntheticEvent) => void;
}) => {
  const checkedItems = useRecoilValue(checkedCartState);

  const sum = checkedItems.reduce((prev, cur) => {
    return (prev += cur.price * cur.amount);
  }, 0);

  return (
    <div className='cart-willpay'>
      <ul>
        {checkedItems.map(({ imageUrl, price, title, id, amount }) => {
          return (
            <li key={id}>
              <ItemInfo imageUrl={imageUrl} price={price} title={title} />
              <p>수량: {amount}</p>
              <p>금액: {price * amount}</p>
            </li>
          );
        })}
      </ul>
      <p>총 예상 결제액: {sum}</p>
      <button onClick={handleSubmit}>{subTitle}</button>
    </div>
  );
};

export default WillPay;
