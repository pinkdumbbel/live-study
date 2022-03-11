import { createRef, SyntheticEvent, useRef } from 'react';
import { CartGraphql } from '../../graphql/cart';
import CartItem from './item';

const CartList = ({ items }: { items: CartGraphql[] }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());
  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;
    const formData = new FormData(formRef.current);
    const selectedCount = formData.getAll('select-item').length;

    if (targetInput.classList.contains('select-all')) {
      //select-all 선택시
      const allChecked = targetInput.checked;
      checkboxRefs.forEach((checkboxEl) => {
        console.log(checkboxEl.current);
        checkboxEl.current!.checked = allChecked;
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
        {items.map((item, i) => (
          <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
        ))}
      </ul>
    </form>
  );
};

export default CartList;
