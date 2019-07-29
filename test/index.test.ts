import { deepPrune } from "../src";

describe("deepPrune", () => {
  describe("object", () => {
    it("removes `undefined`", () => {
      expect(deepPrune({ key: undefined })).toEqual({});
    });

    it("removes `null`", () => {
      expect(deepPrune({ key: null })).toEqual({});
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

    it("does not remove zero", () => {
      expect(deepPrune([0])).toEqual([0]);
    });

    it("does not remove a blank string", () => {
      expect(deepPrune([""])).toEqual([""]);
    });

    it("does not remove an empty array", () => {
      expect(deepPrune([ [] ])).toEqual([[]]);
    });
  });
});
