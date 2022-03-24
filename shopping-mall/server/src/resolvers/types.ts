import { Timestamp } from 'firebase/firestore/lite';

export type Resolver = {
  [k: string]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: {
        db: {
          products: Products;
          cart: Cart;
        };
      },
      info: any
    ) => any;
  };
};

export interface Product {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt?: number;
}

export type Products = Product[];

export interface CartItem {
  id: string;
  amount: number;
  /* product: Product; */
}

export type Cart = CartItem[];
