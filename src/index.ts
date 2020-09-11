const isPlainObject = (value: any): value is Object =>
  Object.prototype.toString.call(value) === "[object Object]";

/**
 * Tests if a value is `null` or `undefined`.
 */
export const isNil = (value: any): value is null | undefined =>
  value === null || value === undefined;

/**
 * Tests if a value is `null`, `undefined`, `""`, `[]`, or `{}`.
 */
export const isEmpty = (value: any): boolean =>
  isNil(value) ||
  value === "" ||
  (Array.isArray(value) && value.length === 0) ||
  (isPlainObject(value) && Object.keys(value).length === 0);

/**
 * Recursively removes `null` or `undefined` values from an array or an object.
 * @param value Any object or array.
 * @param filter A function that customizes which values are removed.
 */
export const deepPrune = (
  value: any,
  filter: (value: any) => boolean = isNil
): any => {
  if (Array.isArray(value)) {
    const result: any[] = [];
    for (let i = 0; i < value.length; i++) {
      const pruned = deepPrune(value[i], filter);
      if (!filter(pruned)) result.push(pruned);
    }
    return result;
  }

  if (isPlainObject(value)) {
    const result: { [key: string]: any } = {};
    for (let key in value) {
      if (!value.hasOwnProperty(key)) continue;
      const pruned = deepPrune(value[key], filter);
      if (!filter(pruned)) result[key] = pruned;
    }
    return result;
  }

  return value;
};
