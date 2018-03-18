#!/usr/bin/env node

const f = require("faker");

/**
 * Generate an array from random length between `min` and `max`, calling `fct` 
 * to populate each item.
 * 
 * TODO: Support more than just uniform distribution
 * 
 * @param {function} fct 
 * @param {number} min = 0
 * @param {number} max = 10
 */
function several(fct, min = 0, max = 10) {
  const num = Math.floor(Math.random() * max) + Math.floor(min);
  const coll = [];
  for (let i = 0; i < num; i++) {
    coll.push(fct());
  }
  return coll;
}

const customers = [];
for (let i = 0; i < 10; i++) {
  customers.push({
    id: f.random.uuid(),
    name: { first: f.name.firstName(), last: f.name.lastName() },
    address: {
      street: f.address.streetAddress(),
      city: f.address.city(),
      zip: f.address.zipCode()
    },
    notes: several(f.lorem.sentence, 0, 5),
    verified: f.random.boolean()
  });
}
process.stdout.write(JSON.stringify(customers, null, 2));
