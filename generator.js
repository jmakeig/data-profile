#!/usr/bin/env node

const f = require('faker');
const out = [];
for (let i = 0; i < 100; i++) {
  out.push({
    id: f.random.uuid(),
    name: { first: f.name.firstName(), last: f.name.lastName() },
    address: {
      street: f.address.streetAddress(),
      city: f.address.city(),
      zip: f.address.zipCode()
    },
    verified: f.random.boolean()
  });
}
console.log(out);
