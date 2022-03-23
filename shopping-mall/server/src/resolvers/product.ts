import { Product, Products, Resolver } from './types';
import { v4 as uuid } from 'uuid';
import { DBField, writeDB } from '../dbController';
import { collection, query, where, orderBy, limit } from 'firebase/firestore/lite';
import { db } from '../../firebase';

const PAGE_SIZE = 15;
const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data);

const productResolver: Resolver = {
  Query: {
    products: (_, { cursor = 0, showDeleted = false }) => {
      const products = collection(db, 'products');
      const queryOptions = [orderBy('createAt', 'desc')];

      if (!showDeleted) queryOptions.unshift(where('createAt', '!=', null));

      const q = query(products, ...queryOptions, limit(PAGE_SIZE));

      /*       const [hasCreatedAt, noCreateAt] =  [
        db.products
          .filter((product) => !!product.createdAt)
          .sort((a, b) => b.createdAt! - a.createdAt!),
        db.products.filter((product) => !product.createdAt),
      ];

      const filteredDB = showDeleted
        ? [...hasCreatedAt, ...noCreateAt]
        : hasCreatedAt;

      const products = filteredDB.slice(cursor, cursor + 15);
      //console.log(products); */
      return products;
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((item) => item.id === id);
      if (found) return found;
      return null;
    },
  },
  Mutation: {
    addProduct: (_, { price, title, description, imageUrl }, { db }) => {
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
    updateProduct: (_, { id, ...data }, { db }) => {
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
    deleteProduct: (_, { id }, { db }) => {
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
