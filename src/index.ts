const isNil = (value: any): value is null | undefined => {
  return value === null || typeof value === "undefined";
};

const isPlainObject = (value: any): value is Object => {
  return Object.prototype.toString.call(value) === "[object Object]";
};

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
    const result: any = [];
    for (let i = 0; i < value.length; i++) {
      const pruned = deepPrune(value[i], filter);

      if (!filter(pruned)) {
        result.push(pruned);
      }
    }
    return result;
  }

  if (isPlainObject(value)) {
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
