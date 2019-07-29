import { DeepPartial } from "utility-types";

const isNil = (value: any): value is null | undefined => {
  return value === null || typeof value === "undefined";
};

const isObject = (value: any): value is object => {
  return value !== null && typeof value === "object";
};

/**
 * Recursively removes `null` or `undefined` values from an array or an object.
 * @param value Any object or array.
 * @param filter A function that customizes which values are removed.
 */
export const deepPrune = <T>(
  value: T,
  filter: (value: any) => boolean = isNil
): DeepPartial<T> => {
  if (Array.isArray(value)) {
    const result: any = [];
    for (let i = 0; i < value.length; i++) {
      const pruned = deepPrune(value[i], filter);

      if (!filter(pruned)) {
        result.push(pruned);
      }
    }
    return result;
  }

  if (isObject(value)) {
    const result: any = {};
    for (let key in value) {
      if (value.hasOwnProperty(key) && !filter(value[key])) {
        result[key] = deepPrune(value[key]);
      }
    }
    return result;
  }

  return value as any;
};
