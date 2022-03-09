import { graphql } from 'msw';
import { v4 as uuid } from 'uuid';
import GET_PRODUCTS from '../graphql/products';
const mockProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://placeimg.com/640/480/${i + 1}`,
  price: 50000,
  title: `샘플상품${i + 1}`,
  description: `샘플상품상세정보${i + 1}`,
  createdAt: new Date(1645746635682 + i * 1000 * 60 * 60 * 24).toString(),
}));
export const handlers = [
  graphql.query(GET_PRODUCTS, (_, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),
];
