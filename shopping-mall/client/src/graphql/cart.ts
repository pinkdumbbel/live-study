import { gql } from 'graphql-tag';
import { ProductGraphql } from './products';

export interface CartGraphql {
  id: string;
  amount: number;
  product: ProductGraphql;
}

export type CartInfo = Pick<ProductGraphql, 'imageUrl' | 'title' | 'price'>;

export const GET_CART = gql`
  query GET_CART {
    cart {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const ADD_CART = gql`
  mutation ADD_CART($id: ID!) {
    addCart(id: $id) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: ID!, $amount: Int!) {
    updateCart(id: $id, amount: $amount) {
      id
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
      amount
    }
  }
`;

export const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!) {
    deleteCart(id: $id)
  }
`;
