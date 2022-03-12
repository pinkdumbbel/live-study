import { useRecoilValue } from 'recoil';
import { checkedCartState } from '../../recolis/cart';
import { useNavigate } from 'react-router-dom';
import ItemInfo from './itemInfo';

const WillPay = () => {
  const navigate = useNavigate();

  const checkedItems = useRecoilValue(checkedCartState);

  const sum = checkedItems.reduce((prev, cur) => {
    return (prev += cur.price * cur.amount);
  }, 0);

  const handleSubmit = () => {
    if (checkedItems.length) navigate('/payment');
    else alert('결제할 상품이 없습니다.');
  };
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
      <button onClick={handleSubmit}>결제하기</button>
    </div>
  );
};

export default WillPay;
