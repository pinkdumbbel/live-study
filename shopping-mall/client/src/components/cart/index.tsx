import { createRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CartGraphql } from '../../graphql/cart';
import { checkedCartState } from '../../recolis/cart';
import { useNavigate } from 'react-router-dom';
import CartItem from './item';
import WillPay from '../willPay';

const CartList = ({ items }: { items: CartGraphql[] }) => {
  const [checkedCartItems, setCheckedCartItems] =
    useRecoilState(checkedCartState);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>();
  const checkboxRefs = items.map(() => {
    return createRef<HTMLInputElement>();
  });

  const navigate = useNavigate();
  const enabledProduct = items.filter((item) => item.product.createdAt);

  const setAllCheckedFromitems = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const selectedCount = formData.getAll('select-item').length;
    const allChecked = selectedCount === enabledProduct.length;
    formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked =
      allChecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs
      .filter((elem) => !elem.current?.disabled)
      .forEach((elem) => {
        elem.current!.checked = allChecked;
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

  const handleSubmit = () => {
    if (checkedCartItems.length) navigate('/payment');
    else alert('결제할 상품이 없습니다.');
  };

  useEffect(() => {
    checkedCartItems.forEach((item) => {
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
      <WillPay handleSubmit={handleSubmit} subTitle='결제창으로' />
    </>
  );
};

export default CartList;
