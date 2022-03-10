import { SyntheticEvent, useRef } from 'react';
import { CartGraphql } from '../../graphql/cart';
import CartItem from './item';

const CartList = ({ items }: { items: CartGraphql[] }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const checkboxs = formRef.current.querySelectorAll<HTMLInputElement>(
      '.cart-item__checkbox'
    );
    const targetInput = e.target as HTMLInputElement;
    const formData = new FormData(formRef.current);
    const selectedCount = formData.getAll('select-item').length;

    if (targetInput.classList.contains('select-all')) {
      //select-all 선택시
      const allChecked = targetInput.checked;
      checkboxs.forEach((checkboxEl) => {
        checkboxEl.checked = allChecked;
      });
    } else {
      //개별아이템 선택시
      const allChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked =
        allChecked;
    }
  };

  return (
    <form ref={formRef} onChange={handleCheckboxChanged}>
      <label>
        <input className='select-all' name='select-all' type='checkbox' />
        전체선택
      </label>
      <ul className='cart'>
        {items.map((item) => (
          <CartItem {...item} key={item.id} />
        ))}
      </ul>
    </form>
  );
};

export default CartList;
