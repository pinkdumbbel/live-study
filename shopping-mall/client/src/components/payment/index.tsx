import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recolis/cart';
import { useNavigate } from 'react-router-dom';
import WillPay from '../willPay';
import PaymentModal from './modal';
import { useMutation } from 'react-query';
import { graphqlFetcher } from '../../queryClient';
import { DELETE_SUCCESS_PAYMENT_ITEMS } from '../../graphql/payment';

const Payment = () => {
  const [checkedCartItems, setCheckedCartItems] =
    useRecoilState(checkedCartState);

  const { mutate: deleteCart } = useMutation(
    () =>
      graphqlFetcher(DELETE_SUCCESS_PAYMENT_ITEMS, {
        ids: [...checkedCartItems.map((item) => item.id)],
      }),
    {
      onSuccess: () => {
        alert('결제가 완료 되었습니다.');
        setCheckedCartItems([]);
      },
    }
  );

  const [modalShown, toggleModal] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    toggleModal(true);
  };

  const proceed = () => {
    deleteCart();
    navigate('/products', { replace: true });
  };

  const cancel = () => {
    toggleModal(false);
  };
  return (
    <div className='payment'>
      <WillPay handleSubmit={showModal} subTitle='결제하기' />
      <PaymentModal show={modalShown} proceed={proceed} cancel={cancel} />
    </div>
  );
};

export default Payment;
