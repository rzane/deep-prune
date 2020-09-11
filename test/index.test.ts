import { deepPrune, isNil, isEmpty } from "../src";

describe("deepPrune", () => {
  describe("object", () => {
    it("removes `undefined`", () => {
      expect(deepPrune({ key: undefined })).toEqual({});
    });

    it("removes `null`", () => {
      expect(deepPrune({ key: null })).toEqual({});
    });

    it("removes values deeply", () => {
      expect(deepPrune({ foo: [{ bar: null, buzz: 1 }] })).toEqual({
        foo: [{ buzz: 1 }],
      });
    });

    it("prunes depth-first", () => {
      expect(deepPrune({ foo: { bar: "" } }, isEmpty)).toEqual({});
    });

    it("accepts a custom filter", () => {
      expect(deepPrune({ foo: 1, bar: 2 }, (v) => v === 1)).toEqual({ bar: 2 });
    });

    it("does not remove false", () => {
      expect(deepPrune({ key: false })).toEqual({ key: false });
    });

    it("does not remove zero", () => {
      expect(deepPrune({ key: 0 })).toEqual({ key: 0 });
    });

    it("does not remove a blank string", () => {
      expect(deepPrune({ key: "" })).toEqual({ key: "" });
    });

    it("does not remove an empty array", () => {
      expect(deepPrune({ key: [] })).toEqual({ key: [] });
    });
  });

  describe("array", () => {
    it("removes `undefined`", () => {
      expect(deepPrune([undefined])).toEqual([]);
    });

    it("removes `null`", () => {
      expect(deepPrune([null])).toEqual([]);
    });

    it("removes deeply nested values", () => {
      expect(deepPrune([{ foo: ["bar", null] }])).toEqual([{ foo: ["bar"] }]);
    });

    it("accepts a custom filter", () => {
      expect(deepPrune([1, 2, 3], (v) => v === 1)).toEqual([2, 3]);
    });

    it("prunes depth-first", () => {
      expect(deepPrune([{ bar: "" }], isEmpty)).toEqual([]);
    });

    it("does not remove false", () => {
      expect(deepPrune([false])).toEqual([false]);
    });

    it("does not remove zero", () => {
      expect(deepPrune([0])).toEqual([0]);
    });

    it("does not remove a blank string", () => {
      expect(deepPrune([""])).toEqual([""]);
    });

    it("does not remove an empty array", () => {
      expect(deepPrune([[]])).toEqual([[]]);
    });
  });

  describe("class", () => {
    class Person {}

    it("does not prune classes", () => {
      const person = new Person();
      expect(deepPrune({ person })).toEqual({ person });
    });
  });

  describe("primitives", () => {
    it("accepts numbers", () => {
      expect(deepPrune(0)).toEqual(0);
    });

    it("accepts strings", () => {
      expect(deepPrune("")).toEqual("");
    });

    it("accepts boolean", () => {
      expect(deepPrune(false)).toEqual(false);
    });

    it("accepts null", () => {
      expect(deepPrune(null)).toEqual(null);
    });

    it("accepts undefined", () => {
      expect(deepPrune(undefined)).toEqual(undefined);
    });
  });
});

test("isNil", () => {
  expect(isNil(null)).toBe(true);
  expect(isNil(undefined)).toBe(true);
  expect(isNil(false)).toBe(false);
  expect(isNil(true)).toBe(false);
  expect(isNil([])).toBe(false);
  expect(isNil("")).toBe(false);
  expect(isNil(0)).toBe(false);
});

test("isEmpty", () => {
  expect(isEmpty(null)).toBe(true);
  expect(isEmpty(undefined)).toBe(true);
  expect(isEmpty(false)).toBe(false);
  expect(isEmpty(true)).toBe(false);
  expect(isEmpty([])).toBe(true);
  expect(isEmpty([1])).toBe(false);
  expect(isEmpty("")).toBe(true);
  expect(isEmpty(" ")).toBe(false);
  expect(isEmpty(0)).toBe(false);
  expect(isEmpty({})).toBe(true);
  expect(isEmpty({ foo: undefined })).toBe(false);
});
