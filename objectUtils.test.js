import {omit, omitBy, pick, pickBy, toPairs} from "./objectUtils";

describe('omit', () => {
  test(`should return {'b': '2'} `, () => {
    const obj = { 'a': 1, 'b': '2', 'c': 3 };
    const arr = ['a', 'c'];
    const expected = { 'b': '2' };
    expect(omit(obj, arr)).toEqual(expected);
  });

  test(`should return {} `, () => {
    const obj = {};
    const arr = ['a', 'c'];
    const expected = {};
    expect(omit(obj, arr)).toEqual(expected);
  });

  test(`should return an empty object `, () => {
    const obj = undefined;
    const arr = ['a', 'c'];
    const expected = {};
    expect(omit(obj, arr)).toEqual(expected);
  });

  test(`should return an object if array is not defined `, () => {
    const obj = { 'a': 1, 'b': '2', 'c': 3 };
    const arr = undefined;
    const expected = { 'a': 1, 'b': '2', 'c': 3 };
    expect(omit(obj, arr)).toEqual(expected);
  });
});

describe('omitBy', () => {
  test(`should return { 'b': '2' }`, () => {
    const object = { 'a': 1, 'b': '2', 'c': 3 };
    const func = (value) => {
      if (typeof value === 'number') {
        return true
      }
    };
    const expected = { 'b': '2' };
    expect(omitBy(object, func)).toEqual(expected);
  });

  test(`should return empty object`, () => {
    const object = {};
    const func = (value) => {
      if (typeof value === 'number') {
        return true
      }
    };
    const expected = {};
    expect(omitBy(object, func)).toEqual(expected);
  });
});

describe('pick', () => {
  test(`should return {'a': 1, 'c': 3 } `, () => {
    const obj = { 'a': 1, 'b': '2', 'c': 3 };
    const arr = ['a', 'c'];
    const expected = { 'a': 1, 'c': 3 };
    expect(pick(obj, arr)).toEqual(expected);
  });

  test(`should return {} `, () => {
    const obj = {};
    const arr = ['a', 'c'];
    const expected = {};
    expect(pick(obj, arr)).toEqual(expected);
  });

  test(`should return empty object  if input object is not defined`, () => {
    const obj = undefined;
    const arr = ['a', 'c'];
    const expected = {};
    expect(pick(obj, arr)).toEqual(expected);

  });

  test(`should return  object if array is not defined `, () => {
    const obj = { 'a': 1, 'b': '2', 'c': 3 };
    const arr = undefined;
    const expected = {};
    expect(pick(obj, arr)).toEqual(expected);
  });
});

describe('pickBy', () => {
  test(`should return { 'a': 1, 'c': 3  }`, () => {
    const object = { 'a': 1, 'b': '2', 'c': 3 };
    const func = (value) => {
      if (typeof value === 'number') {
        return true
      }
    };
    const expected = { 'a': 1, 'c': 3 };
    expect(pickBy(object, func)).toEqual(expected);
  });

  test(`should return empty object`, () => {
    const object = {};
    const func = (value) => {
      if (typeof value === 'number') {
        return true
      }
    };
    const expected = {};
    expect(pickBy(object, func)).toEqual(expected);
  });
});

describe('toPairs', () => {
  test(`should return [['a', 1], ['b', 2]]`, () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    const expected = [['a', 1], ['b', 2]];
    expect(toPairs( new Foo)).toEqual(expected);
  });

  test('should return en empty array', () => {
    expect(toPairs( {})).toEqual([]);
  });

  test('should return en empty arr if object is not defined', () => {
    expect(toPairs( undefined)).toEqual([]);
  });
});
