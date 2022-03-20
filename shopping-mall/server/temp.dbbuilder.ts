import { v4 as uuid } from 'uuid';
import { DBField, writeDB } from './src/dbController';
const db = Array.from({ length: 100 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://picsum.photos/id/${i}/200/150`,
  price: 1000 + Math.floor(Math.random() * 20) * 500,
  title: `임시상품_${i + 1}`,
  description: `임시상품 설명_${i + 1}`,
  createdAt: 1642424841540 + 1000 * 60 * 60 * 5 * i + 1,
}));

writeDB(DBField.PRODUCTS, db);
