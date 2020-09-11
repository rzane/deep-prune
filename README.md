<h1 align="center">deep-prune</h1>

<div align="center">

![Build](https://github.com/rzane/deep-prune/workflows/Build/badge.svg)
![Version](https://img.shields.io/npm/v/deep-prune)
![Size](https://img.shields.io/bundlephobia/minzip/deep-prune)
![License](https://img.shields.io/npm/l/deep-prune)

</div>

Deeply prunes `null` or `undefined` values from an array or object.

You can also customize the values that get pruned.

## Usage

```javascript
import { deepPrune } from "deep-prune";

deepPrune({ foo: null, bar: 100 });
// { bar: 100 }

deepPrune([1, null, undefined, ""]);
// [1, ""]

deepPrune([{ foo: { bar: null, buzz: 2 } }]);
// [{ foo: { buzz: 2 } }]

deepPrune([1, 2, 3], value => value === 1);
// [2, 3]
```
