import WillPay from '../willPay';

const Payment = () => {
  const showModal = () => {};
  return (
    <div className='payment'>
      <WillPay handleSubmit={showModal} subTitle='결제하기' />
    </div>
  );
};

export default Payment;
