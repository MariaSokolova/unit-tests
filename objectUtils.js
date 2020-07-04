export const omit = (obj, arr) => {
  if (!Array.isArray(arr)) {
    return obj;
  }
  const newObj = {};
  for (const property in obj) {
    let isInclude = false;
    for (let i = 0; i < arr.length; i++) {
      if (property === arr[i]) {
        isInclude = true;
      }
    }
    if (!isInclude) {
      newObj[property] = obj[property];
    }
  }
  return newObj;
};

export const omitBy = (obj, func) => {
  const newObj = {};
  for (const property in obj) {
    if (!func(obj[property], property)) {
      newObj[property] = obj[property];
    }
  }
  return newObj;
};

export const pick = (obj, arr) => {
  if (!Array.isArray(arr)) {
    return {};
  }
  const newObj = {};
  for (const property in obj) {
    let isInclude = false;
    for (let i = 0; i < arr.length; i++) {
      if (property === arr[i]) {
        isInclude = true;
      }
    }
    if (isInclude) {
      newObj[property] = obj[property];
    }
  }
  return newObj;
};

export const pickBy = (obj, func) => {
  const newObj = {};
  for (const property in obj) {
    if (func(obj[property], property)) {
      newObj[property] = obj[property];
    }
  }
  return newObj;
};

export const toPairs = (obj) => {
if (!obj) {
  return [];
}
 return  Object.entries(obj);
};
