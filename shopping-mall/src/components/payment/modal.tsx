import { ReactChild } from 'react';
import { createPortal } from 'react-dom';

const PaymentPortal = ({ children }: { children: ReactChild }) => {
  return createPortal(children, document.getElementById('modal')!);
};

const PaymentModal = ({
  show,
  proceed,
  cancel,
}: {
  show: boolean;
  proceed: () => void;
  cancel: () => void;
}) => {
  return (
    show && (
      <PaymentPortal>
        <div>
          <p>정말 결제할까요?</p>
          <div>
            <button onClick={proceed}>예</button>
            <button onClick={cancel}>아니오</button>
          </div>
        </div>
      </PaymentPortal>
    )
  );
};

export default PaymentModal;
