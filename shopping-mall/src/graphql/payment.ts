import { gql } from 'graphql-tag';

export const DELETE_SUCCESS_PAYMENT_ITEMS = gql`
  mutation DELETE_SUCCESS_PAYMENT_ITEMS($ids: [string]) {
    DELETE_SUCCESS_PAYMENT_ITEMS(ids: $ids) {
      ids
    }
  }
`;
