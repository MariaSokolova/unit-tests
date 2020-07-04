export const compact = (arr) => {
  const result = [];

  if (!Array.isArray(arr)) {
    return result;
  }
  for (let el of arr) {
    if (el) {
      result[result.length] = el;
    }
  }
  return result;
};

export const chunk = (arr, size) => {
  if (!Array.isArray(arr) || size < 1) {
    return [];
  }
  const resultSize = Math.ceil(arr.length / size);
  const result = new Array(resultSize);
  for (let i = 0; i < resultSize; i++) {
    result[i] = [];
  }
  for (let i = 0; i < arr.length; i++) {
    const x = Math.floor(i / size);
    const y = i % size;
    result[x][y] = arr[i];
  }
  return result;
};

export const drop = (arr, n = 1) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  if (n < 1) {
    return arr;
  }
  const length = arr.length - n;
  const newArr = [];
  for (let i = 0; i < length; i++) {
    newArr[i] = arr[i + n];
  }
  return newArr;
};

export const take = (arr, n = 1) => {
  if (!Array.isArray(arr) || n === 0) {
    return [];
  }
  if (n > arr.length) {
    return arr;
  }
  let newArr = [];
  for (let i = 0; i < n; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};

export const dropWhile = (arr, func) => {
  if (!Array.isArray(arr)) {
    return [];
  }
  let currentIndex = arr.length;
  for (let i = 0; i < arr.length; i++) {
    if (!func(arr[i], i, arr)) {
      currentIndex = i;
      break;
    }
  }
  const length = arr.length - currentIndex;
  const newArr = [];
  for (let i = 0; i < length; i++) {
    newArr[i] = arr[i + currentIndex];
  }
  return newArr;
};

export const filter = (collection, func) => {
  if (!Array.isArray(collection)) {
    return [];
  }
  const newArr = [];
  let newIndex = 0;
  for (let i = 0; i < collection.length; i++) {
    if (func(collection[i], i, collection)) {
      newArr[newIndex] = collection[i];
      newIndex++;
    }
  }
  return newArr;
};

export const find = (collection, func, index = 0) => {
  for (let i = index; i < collection.length; i++) {
    if (func(collection[i], i, collection)) {
      return collection[i];
    }
  }
};

export const includes = (collection, value, fromIndex = 0) => {
  if (Array.isArray(collection)) {
    for (let i = fromIndex; i < collection.length; i++) {
      if (value === collection[i]) {
        return true;
      }
    }
    return false;
  }

  if (typeof collection === 'object') {
    for (const property in collection) {
      if (collection[property] === value) {
        return true;
      }
    }
  }

  if (typeof collection === 'string') {
    let startIndex;
    if (fromIndex < 0) {
      startIndex = collection.length + fromIndex;
    } else {
      startIndex = fromIndex;
    }
    if (collection.includes(value, startIndex)) {
      return true;
    }
  }
  return false;
};


export const map = (arr, func) => {
  if (!Array.isArray(arr)) {
    return []
  }
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = func(arr[i], i, arr);
  }
  return newArr;
};

export const zip = (...arr) => {
  if (arr.length === 0) {
    return [];
  }
  const newArr = [];
  const length = arr[0].length;
  for (let i = 0; i < length; i++) {
    newArr[i] = [];
    for (let j = 0; j < arr.length; j++) {
      newArr[i][j] = arr[j][i];
    }
  }
  return newArr;
};
