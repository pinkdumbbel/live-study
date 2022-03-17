import { Product, Products, Resolver } from './types';
import { v4 as uuid } from 'uuid';
import { DBField, writeDB } from '../dbController';

const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data);

const productResolver: Resolver = {
  Query: {
    products: (_, { cursor = 0 }, { db }) => {
      const products = db.products.slice(cursor, cursor + 15);
      return products;
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((item) => item.id === id);
      console.log(found);
      if (found) return found;
      return null;
    },
  },
  Mutation: {
    addProduct: (parent, { price, title, description, imageUrl }, { db }) => {
      const newProduct = {
        id: uuid(),
        imageUrl,
        price,
        title,
        description,
        createdAt: Date.now(),
      };

      db.products.push(newProduct);
      setJSON(db.products);

      return newProduct;
    },
    updateProduct: (parent, { id, ...data }, { db }) => {
      const existProductItemIdx = db.products.findIndex(
        (item) => item.id === id
      );
      if (existProductItemIdx < 0) {
        throw new Error('없는 상품입니다.');
      }

      const updateProduct = {
        ...db.products[existProductItemIdx],
        ...data,
      };

      db.products.splice(existProductItemIdx, 1, updateProduct);

      setJSON(db.products);
      return updateProduct;
    },
    deleteProduct: (parent, { id }, { db }) => {
      const existProductItemIdx = db.products.findIndex(
        (item) => item.id === id
      );
      if (existProductItemIdx < 0) {
        throw new Error('없는 상품입니다.');
      }

      const updatedItem = {
        ...db.products[existProductItemIdx],
      };
      delete updatedItem.createdAt;

      db.products.splice(existProductItemIdx, 1, updatedItem);
      setJSON(db.products);

      return id;
    },
  },
};

export default productResolver;
