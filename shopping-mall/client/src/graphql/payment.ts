import { gql } from 'graphql-tag';

export const DELETE_SUCCESS_PAYMENT_ITEMS = gql`
  mutation DELETE_SUCCESS_PAYMENT_ITEMS($ids: [ID!]) {
    executePay(ids: $ids)
  }
`;
