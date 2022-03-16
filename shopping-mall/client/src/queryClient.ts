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

//const BASE_URL = 'https://fakestoreapi.com';
const BASE_URL = 'http://localhost:8000/graphql';
/* export const fetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    const url = `${BASE_URL}${path}`;
    console.log(url);
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL,
      },
    };
    const res = await fetch(url, fetchOptions);
    const json = await res.json();
    return json;
  } catch (e) {}
}; */
export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(BASE_URL, query, variables);
export const QueryKeys = {
  PRODUCTS: 'PRODUCTS',
  CART: 'CART',
};
