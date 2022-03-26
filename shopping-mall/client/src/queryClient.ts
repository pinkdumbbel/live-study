import request, { RequestDocument } from 'graphql-request';
import { QueryClient } from 'react-query';

type AnyOBJ = { [key: string]: any };

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            refetchInterval: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
          },
        },
      });

    return client;
  };
})();

const BASE_URL = import.meta.env.VITE_SERVER_URL as string;

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(`${BASE_URL}/graphql`, query, variables, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL,
  });
export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
  CART: 'CART',
};
