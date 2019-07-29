import { DeepPartial } from "utility-types";

const isNil = (value: any): value is null | undefined => {
  return value === null || typeof value === "undefined";
};

const isObject = (value: any): value is object => {
  return value !== null && typeof value === "object";
};

export const deepPrune = <T>(
  value: T,
  filter: (value: any) => boolean = isNil
): DeepPartial<T> => {
  if (Array.isArray(value)) {
    return value.reduce((acc, v) => {
      const nextValue = deepPrune(v, filter);

      if (filter(nextValue)) {
        return acc;
      }

      return [...acc, nextValue]
    }, []);
  }

  if (isObject(value)) {
    return Object.entries(value).reduce<any>((acc, [k, v]) => {
      if (filter(v)) {
        return acc;
      }

      return Object.assign(acc, { [k]: deepPrune(v, filter) });
    }, {});
  }

  return value as any;
};
