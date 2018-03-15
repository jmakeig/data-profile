#!/usr/bin/env node

const f = require('faker');

const customers = [];
for (let i = 0; i < 1000; i++) {
  customers.push({
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
process.stdout.write(JSON.stringify(customers, null, 2));
