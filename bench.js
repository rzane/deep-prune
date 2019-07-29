const { deepPrune } = require("./lib");

/**
 * The number of iterations.
 */
const count = 50000;

/**
 * Input data.
 */
const data = {
  foo: { bar: [null, { foo: 1 }, ["hello"]] },
  bar: [1, 2, 3, 4, 5, { hello: "world" }]
};

/**
 * Run the iterations.
 */
console.time('deepPrune');
for (var i = 0; i < count; i++) {
  deepPrune(data);
}
console.timeEnd('deepPrune');
