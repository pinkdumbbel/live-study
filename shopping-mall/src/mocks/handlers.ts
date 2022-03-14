import { graphql } from 'msw';
import { v4 as uuid } from 'uuid';
import {
  ADD_CART,
  CartGraphql,
  DELETE_CART,
  GET_CART,
  UPDATE_CART,
} from '../graphql/cart';
import { DELETE_SUCCESS_PAYMENT_ITEMS } from '../graphql/payment';
import { GET_PRODUCT, GET_PRODUCTS } from '../graphql/products';
const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + '',
    imageUrl: `https://placeimg.com/200/150/${i + 1}`,
    price: 50000,
    title: `샘플상품${i + 1}`,
    description: `샘플상품상세정보${i + 1}`,
    createdAt: new Date(1645746635682 + i * 1000 * 60 * 60 * 24).toString(),
  })))();

let cartData: { [key: string]: CartGraphql } = {};

export const handlers = [
  graphql.query(GET_PRODUCTS, (_, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find((item) => item.id === req.variables.id);
    console.log(found);
    if (found) return res(ctx.data(found));

    return res();
  }),
  graphql.query(GET_CART, (_, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const id = req.variables.id;
    const targetProduct = mockProducts.find(
      (item) => item.id === req.variables.id
    );
    if (!targetProduct) {
      throw new Error('상품이 없습니다.');
    }

    const newItem = {
      ...targetProduct,
      amount: (newCartData[id]?.amount || 0) + 1,
    };

    newCartData[id] = newItem;
    cartData = newCartData;
    return res(ctx.data({ newItem }));
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const newCartData = { ...cartData };
    const { id, amount } = req.variables;

    if (!newCartData[id]) {
      throw new Error('없는 데이터 입니다.');
    }

    const newUpdatedCartItem = {
      ...newCartData[id],
      amount,
    };

    newCartData[id] = newUpdatedCartItem;
    cartData = newCartData;

    return res(ctx.data(newUpdatedCartItem));
  }),
  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newCartData = { ...cartData };
    delete newCartData[id];

    cartData = newCartData;

    return res(ctx.data(id));
  }),

  graphql.mutation(
    DELETE_SUCCESS_PAYMENT_ITEMS,
    ({ variables: { ids } }, res, ctx) => {
      const newCartData = { ...cartData };
      ids.forEach((id: string) => {
        delete newCartData[id];
      });

      cartData = newCartData;

      return res(ctx.data(ids));
    }
  ),
];
