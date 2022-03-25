import { Resolver } from './types';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';

const PAGE_SIZE = 15;

const productResolver: Resolver = {
  Query: {
    products: async (_, { cursor = '', showDeleted = false }) => {
      const products = collection(db, 'products');
      const queryOptions = [orderBy('createdAt', 'desc')];

      if (cursor) {
        const snapshot = await getDoc(doc(db, 'products', cursor));
        queryOptions.push(startAfter(snapshot));
      }
      if (!showDeleted) queryOptions.unshift(where('createdAt', '!=', null));

      const q = query(products, ...queryOptions, limit(PAGE_SIZE));
      const snapshot = await getDocs(q);
      const data: DocumentData[] = [];
      snapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          ...doc.data(),
        })
      );
      return data;
    },
    product: async (_, { id }) => {
      const docRef = doc(db, 'products', id);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) return { ...snapshot.data(), id: snapshot.id };
      else throw new Error('상품이 존재하지 않습니다!');
    },
  },
  Mutation: {
    addProduct: async (_, { price, title, description, imageUrl }) => {
      const newProduct = {
        imageUrl,
        price,
        title,
        description,
        createdAt: serverTimestamp(),
      };
      const result = await addDoc(collection(db, 'products'), newProduct);
      const snapshot = await getDoc(result);

      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },
    updateProduct: async (_, { id, ...data }) => {
      const productRef = doc(db, 'products', id);
      if (!productRef) throw new Error('상품이 없습니다.');

      await updateDoc(productRef, data);
      const snap = await getDoc(productRef);

      return {
        ...snap.data(),
        id: snap.id,
      };
    },
    deleteProduct: async (_, { id }) => {
      const productRef = doc(db, 'products', id);
      if (!productRef) throw new Error('상품이 없습니다.');

      await updateDoc(productRef, { createdAt: null });

      return id;
    },
  },
};

export default productResolver;
