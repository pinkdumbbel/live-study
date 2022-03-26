const arrToObj = (arr: [string, FormDataEntryValue][]) =>
  arr.reduce<{ [key: string]: any }>((prev, [key, val]) => {
    prev[key] = val;

    return prev;
  }, {});

export default arrToObj;
