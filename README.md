# deep-prune [![Build Status](https://travis-ci.org/rzane/deep-prune.svg?branch=master)](https://travis-ci.org/rzane/deep-prune)

Deeply prunes `null` or `undefined` values from an array or object.

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
