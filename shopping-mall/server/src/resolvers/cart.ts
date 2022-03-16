import { Cart, CartItem, Resolver } from './types';
import { DBField, writeDB } from '../dbController';

const setJSON = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: Resolver = {
  Query: {
    cart: (_, __, { db }) => {
      return db.cart;
    },
  },
  Mutation: {
    addCart: (_, { id }, { db }) => {
      if (!id) throw Error('상품 id 없음');
      const targetProduct = db.products.find((item) => item.id === id);

      if (!targetProduct) {
        throw new Error('상품이 없습니다');
      }

      const existCartItemIdx = db.cart.findIndex((item) => item.id === id);

      if (existCartItemIdx > -1) {
        const newCartItem = {
          id: db.cart[existCartItemIdx].id,
          amount: db.cart[existCartItemIdx].amount + 1,
        };

        db.cart.splice(existCartItemIdx, 1, newCartItem);
        setJSON(db.cart);
        return newCartItem;
      }

      const newItem = {
        id,
        amount: 1,
      };

      db.cart.push(newItem);
      setJSON(db.cart);

      return newItem;
    },
    updateCart: (_, { id, amount }, { db }) => {
      const existCartItemIdx = db.cart.findIndex((item) => item.id === id);
      if (existCartItemIdx < 0) {
        throw new Error('없는 데이터입니다.');
      }

      const newCartItem = {
        id,
        amount,
      };

      db.cart.splice(existCartItemIdx, 1, newCartItem);
      setJSON(db.cart);

      return newCartItem;
    },
    deleteCart: (_, { id }, { db }) => {
      const existCartItemIdx = db.cart.findIndex((item) => item.id === id);
      if (existCartItemIdx < 0) {
        throw new Error('없는 데이터입니다.');
      }

      db.cart.splice(existCartItemIdx, 1);
      setJSON(db.cart);

      return id;
    },
    executePay: (_, { ids }, { db }) => {
      const newCartData = db.cart.filter(
        (cartItem) => !ids.includes(cartItem.id)
      );
      db.cart = newCartData;
      setJSON(db.cart);
      return ids;
    },
  },
  CartItem: {
    product: (cartItem, args, { db }) =>
      db.products.find((product: any) => product.id === cartItem.id),
  },
};

export default cartResolver;
