import fs from 'fs';
import { resolve } from 'path';
export enum DBField {
  CART = 'cart',
  PRODUCTS = 'products',
}

const basePath = resolve();

const fileNames = {
  [DBField.CART]: resolve(basePath, 'src/db/cart.json'),
  [DBField.PRODUCTS]: resolve(basePath, 'src/db/products.json'),
};

export const readDB = (target: DBField) => {
  try {
    return JSON.parse(fs.readFileSync(fileNames[target], 'utf-8'));
  } catch (err) {
    console.log(err);
  }
};

export const writeDB = (target: DBField, data: unknown) => {
  try {
    fs.writeFileSync(fileNames[target], JSON.stringify(data, null, '  '));
  } catch (err) {
    console.log(err);
  }
};
