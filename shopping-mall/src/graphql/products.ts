import { gql } from 'graphql-tag';

export interface ProductGraphql {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt: string;
}
export interface ProductsGraphql {
  products: ProductGraphql[];
}

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    id
    imageUrl
    price
    title
    description
    createdAt
  }
`;

export default GET_PRODUCTS;
