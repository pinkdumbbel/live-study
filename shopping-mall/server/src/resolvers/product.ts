import { Resolver } from './types';

const productResolver: Resolver = {
  Query: {
    products: (_, __, { db }) => {
      return db.products;
    },
    product: (parent, { id }, { db }, info) => {
      const found = db.products.find((item) => item.id === id);
      console.log(found);
      if (found) return found;
      return null;
    },
  },
};

export default productResolver;
