import { createRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { CartGraphql } from '../../graphql/cart';
import { checkedCartState } from '../../recolis/cart';
import CartItem from './item';
import WillPay from './willPay';

const CartList = ({ items }: { items: CartGraphql[] }) => {
  const [CheckedCartItems, setCheckedCartItems] =
    useRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>();
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());

  const setAllCheckedFromitems = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const selectedCount = formData.getAll('select-item').length;
    const allChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked =
      allChecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs.forEach((checkboxEl) => {
      checkboxEl.current!.checked = allChecked;
    });
  };

  const handleCheckboxChanged = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const targetInput = e.target as HTMLInputElement;
    const formData = new FormData(formRef.current);

    if (targetInput && targetInput.classList.contains('select-all')) {
      //select-all 선택시
      setItemsCheckedFromAll(targetInput);
    } else {
      //개별아이템 선택시
      setAllCheckedFromitems();
    }

    setFormData(formData);
  };

  useEffect(() => {
    CheckedCartItems.forEach((item) => {
      const itemRef = checkboxRefs.find(
        (ref) => item.id === ref.current?.dataset.id
      );
      if (itemRef) itemRef.current!.checked = true;
      setAllCheckedFromitems();
    });
  }, []);

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<CartGraphql[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);

    setCheckedCartItems(checkedItems);
  }, [items, formData]);
  return (
    <>
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
      <WillPay />
    </>
  );
};

export default CartList;
