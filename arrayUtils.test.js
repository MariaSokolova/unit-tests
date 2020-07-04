import {compact, chunk, drop, take, dropWhile, filter, find, includes, map, zip} from './arrayUtils';

describe('compact', () => {
  test('should return array without falsy elements', () => {
    const arr = [0, 1, false, 2, '', 3];
    const expected = [1, 2, 3];

    expect(compact(arr)).toEqual(expected);
  });

  test('should return an empty array', () => {
    const arr = [];
    const expected = [];
    expect(compact(arr)).toEqual(expected);
  });

  test('should return empty array if input is not an array', () => {
    expect(compact(345)).toEqual([]);
  });

  test('should return empty array if input is null', () => {
    expect(compact(null)).toEqual([]);
  });
});

describe('chunk', () => {
  test("should return [['a', 'b'], ['c', 'd']]", () => {
    const arr = ['a', 'b', 'c', 'd'];
    const size = 2;
    const expected = [['a', 'b'], ['c', 'd']];
    expect(chunk(arr, size)).toEqual(expected);
  });

  test("should return [['a', 'b'], ['c', 'd'], ['e']]", () => {
    const arr = ['a', 'b', 'c', 'd', 'e'];
    const size = 2;
    const expected = [['a', 'b'], ['c', 'd'], ['e']];
    expect(chunk(arr, size)).toEqual(expected);
  });

  test('should return []', () => {
    const arr = ['a', 'b', 'c', 'd'];
    const size = -2;
    const expected = [];
    expect(chunk(arr, size)).toEqual(expected);
  });

  test('should return [] if input is null', () => {
    const size = 2;
    const expected = [];
    expect(chunk(null, size)).toEqual(expected);
  });
});

describe('drop', () => {
  test('should return [2, 3] if input  is ([1, 2, 3])', () => {
    const arr = [1, 2, 3];
    const expected = [2, 3];
    expect(drop(arr)).toEqual(expected);
  });

  test('should return [3] if input  is ([1, 2, 3], 2)', () => {
    const arr = [1, 2, 3, 4, 5];
    const n = 2;
    const expected = [3, 4, 5];
    expect(drop(arr, n)).toEqual(expected);
  });

  test('should return [1, 2, 3, 4, 5] if n < 0)', () => {
    const arr = [1, 2, 3, 4, 5];
    const n = -2;
    const expected = [1, 2, 3, 4, 5];
    expect(drop(arr, n)).toEqual(expected);
  });

  test('should return [] if arr = ""', () => {
    const arr = '';
    const n = 2;
    const expected = [];
    expect(drop(arr, n)).toEqual(expected);
  });

  test('should return [1, 2, 3] if n = 0', () => {
    const arr = [1, 2, 3];
    const n = 0;
    const expected = [1, 2, 3];
    expect(drop(arr, n)).toEqual(expected);
  });

  test('should return [] if n > arr.length', () => {
    const arr = [1, 2, 3];
    const n = 5;
    const expected = [];
    expect(drop(arr, n)).toEqual(expected);
  });
});

describe('take', () => {
  test('should return [1] if input ([1, 2, 3])', () => {
    const arr = [1, 2, 3];
    const expected = [1];
    expect(take(arr)).toEqual(expected);
  });

  test('should return [1, 2] if input ([1, 2, 3], 2)', () => {
    const arr = [1, 2, 3];
    const n = 2;
    const expected = [1, 2];
    expect(take(arr, n)).toEqual(expected);
  });

  test('should return [] if input arr = ""', () => {
    const arr = "";
    const n = 2;
    const expected = [];
    expect(take(arr, n)).toEqual(expected);
  });

  test('should return [] if n = 0', () => {
    const arr = [1, 2, 3];
    const n = 0;
    const expected = [];
    expect(take(arr, n)).toEqual(expected);
  });

  test('should return [1, 2, 3] if n > arr.length', () => {
    const arr = [1, 2, 3];
    const n = 5;
    const expected = [1, 2, 3];
    expect(take(arr, n)).toEqual(expected);
  });
});

describe('dropWhile', () => {
  test(`should return [{ 'user': 'pebbles', 'active': true }] if func(o) return true`, () => {
    const users = [
      { 'user': 'barney', 'active': false },
      { 'user': 'fred', 'active': false },
      { 'user': 'pebbles', 'active': true },
    ];
    const expected = [
      { 'user': 'pebbles', 'active': true },
    ];
    const func = (o) => !o.active;
    expect(dropWhile(users, func)).toEqual(expected);
  });

  test('should return [] if func() return true', () => {
    const users = [
      { 'user': 'barney', 'active': false },
      { 'user': 'pebbles', 'active': true },
      { 'user': 'fred', 'active': false },
      { 'user': 'pebbles', 'active': true },
    ];
    const expected = [];
    const func = (o) => true;
    expect(dropWhile(users, func)).toEqual(expected);
  });

  test('should return [] if arr = undefined', () => {
    const users = undefined;
    const expected = [];
    const func = (o) => false;

    expect(dropWhile(users, func)).toEqual(expected);
  });
});

describe('filter', () => {
  test(`should return [{ 'user': 'fred',   'age': 40, 'active': false }] if func return false `, () => {
    const users = [
      { 'user': 'barney', 'age': 36, 'active': true },
      { 'user': 'fred', 'age': 40, 'active': false }
    ];
    const expected = [{ 'user': 'fred', 'age': 40, 'active': false }];
    const func = (o) => !o.active;
    expect(filter(users, func)).toEqual(expected);
  });

  test(`should { 'user': 'fred', 'age': 40, 'active': false }`, () => {
    const users = [
      { 'user': 'barney', 'age': 36, 'active': true },
      { 'user': 'fred', 'age': 40, 'active': false }
    ];
    const expected = [
      { 'user': 'fred', 'age': 40, 'active': false }
    ];
    const func = (o) => o.active === false;
    expect(filter(users, func)).toEqual(expected);
  });

  test(`should [{ 'user': 'barney', 'age': 36, 'active': true }] if  func return true`, () => {
    const users = [
      { 'user': 'barney', 'age': 36, 'active': true },
      { 'user': 'fred', 'age': 40, 'active': false }
    ];
    const expected = [
      { 'user': 'barney', 'age': 36, 'active': true },
    ];
    const func = (o) => o.active;
    expect(filter(users, func)).toEqual(expected);
  });
});

describe('find', () => {
  test(`should return [{ 'user': 'barney',  'age': 36, 'active': true }] if func return o.age < 40`, () => {
    const users = [
      { 'user': 'barney', 'age': 36, 'active': true },
      { 'user': 'fred', 'age': 40, 'active': false },
      { 'user': 'pebbles', 'age': 1, 'active': true }
    ];
    const func = (o) => {
      return o.age < 40
    };
    const expected = { 'user': 'barney', 'age': 36, 'active': true };
    expect(find(users, func)).toEqual(expected);
  });

  test(`should return false [{ 'user': 'pebbles', 'age': 1, 'active': true }] if func return o.age < 40 and indexFrom = 1`, () => {
    const users = [
      { 'user': 'barney', 'age': 36, 'active': true },
      { 'user': 'fred', 'age': 40, 'active': false },
      { 'user': 'pebbles', 'age': 1, 'active': true }
    ];
    const func = (o) => {
      return o.age < 40
    };
    const expected = { 'user': 'pebbles', 'age': 1, 'active': true };
    expect(find(users, func, 1)).toEqual(expected);
  });

  test(`should return undefined if func return false`, () => {
    const users = [
      { 'user': 'barney', 'age': 36, 'active': true },
      { 'user': 'fred', 'age': 40, 'active': false },
      { 'user': 'pebbles', 'age': 1, 'active': true }
    ];
    const func = (o) => false;
    const expected = undefined;
    expect(find(users, func)).toEqual(expected);
  });
});

describe('includes', () => {
  test('should return true if input is ([1, 2, 3], 1)', () => {
    const collection = [1, 2, 3];
    const value = 1;
    expect(includes(collection, value)).toBeTruthy();
  });

  test('should return true if input is ([1, 2, 5, 4, 3], 3, 2)', () => {
    const collection = [1, 2, 5, 4, 3];
    const value = 3;
    const fromIndex = 2;
    expect(includes(collection, value, fromIndex)).toBeTruthy();
  });

  test('should return false if input is ([1, 2, 3], 1, 2)', () => {
    const collection = [1, 2, 3];
    const value = 1;
    const fromIndex = 2;
    expect(includes(collection, value, fromIndex)).toBeFalsy();
  });

  test(`should return true if input is ({ 'a': 1, 'b': 2 }, 1)`, () => {
    const collection = { 'a': 1, 'b': 2 };
    const value = 1;
    expect(includes(collection, value)).toBeTruthy();
  });

  test(`should return false if input is ({ 'a': 1, 'b': 2 }, "1")`, () => {
    const collection = { 'a': 1, 'b': 2 };
    const value = '1';
    expect(includes(collection, value)).toBeFalsy();
  });

  test(`should return true if input is ('Hello world, welcome to the universe.', 'world')`, () => {
    const collection = 'Hello world, welcome to the universe.';
    const value = 'world';
    const fromIndex = -35;
    expect(includes(collection, value, fromIndex)).toBeTruthy();
  });

  test(`should return false if input is ('Hello world, welcome to the universe.', 'world')`, () => {
    const collection = 'Hello world, welcome to the universe.';
    const value = 'world';
    const fromIndex = -25;
    expect(includes(collection, value, fromIndex)).toBeFalsy();
  });

  test(`should return true if input is ('abcd', 'bc')`, () => {
    const collection = 'abcd';
    const value = 'bc';
    expect(includes(collection, value,)).toBeTruthy();
  });
});

describe('map', () => {
  test('should return [16, 64] ', () => {
    const arr = [4, 8];
    const square = (n) => n * n;
    const expected = [16, 64];
    expect(map(arr, square)).toEqual(expected);
  });

  test('should return empty array if input empty arr ', () => {
    const arr = [];
    const square = (n) => n * n;
    const expected = [];
    expect(map(arr, square)).toEqual(expected);
  });

  test('should return empty array if arr = null ', () => {
    const arr = null;
    const square = (n) => n * n;
    const expected = [];
    expect(map(arr, square)).toEqual(expected);
  });
});

describe('zip', () => {
  test(`should return [['a', 1, true], ['b', 2, false]]`, () => {
    const arr1 = ['a', 'b'];
    const arr2 = [1, 2];
    const arr3 = [true, false];
    const expected = [['a', 1, true], ['b', 2, false]];
    expect(zip(arr1, arr2, arr3)).toEqual(expected);
  });

  test(`should return empty array`, () => {
    const expected = [];
    expect(zip()).toEqual(expected);
  });

});


