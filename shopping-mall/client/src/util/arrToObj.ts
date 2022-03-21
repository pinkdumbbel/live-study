const arrToObj = (
  arr: [string, FormDataEntryValue][]
): { [key: string]: any } =>
  arr.reduce((prev, [key, val]) => {
    prev[key] = val;

    return prev;
  }, {});

export default arrToObj;
