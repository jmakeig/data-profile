#!/usr/bin/env node

const f = require("faker");

/**
 * Generate an array from random length between `min` and `max`, calling `fct` 
 * to populate each item.
 * 
 * TODO: Support more than just uniform distribution
 * 
 * @param {function} fct 
 * @param {function} dist
 */
function several(fct, dist = () => Math.random() * 10) {
  const rand = dist();
  const length = Math.max(Math.floor(rand), 0);
  //console.log(length);
  const coll = [];
  for (let i = 0; i < length; i++) {
    coll.push(fct());
  }
  return coll;
}
/*
xquery version "1.0-ml";
declare namespace local="local";

declare function local:norm($x, $mean, $std-dev) {
  math:exp(-0.5 * math:pow((($x - $mean) div $std-dev), 2)) div ($std-dev * math:sqrt(2 * math:pi()))
};

for $i in (1 to 1000)
let $rand := (xdmp:random(5000) - 2500) div 1000
return
  $rand || " " || local:norm($rand, 0, 1)

Given number $x, it fits it to a distribution with mean $mean and standard deviation $std-dev.
*/

function normal($x, $mean, $stddev) {
  return Math.exp(-0.5 * Math.pow((($x - $mean) / $stddev), 2)) / ($stddev * Math.sqrt(2 * Math.PI));
}


const customers = [];
for (let i = 0; i < 100; i++) {
  customers.push({
    id: f.random.uuid(),
    name: { first: f.name.firstName(), last: f.name.lastName() },
    address: {
      street: f.address.streetAddress(),
      city: f.address.city(),
      zip: f.address.zipCode()
    },
    //notes: several(f.lorem.sentence, () => normal(Math.random() * 10, 3, 8)),
    notes: several(f.lorem.sentence, () => Math.random() * 5),
    verified: f.random.boolean()
  });
}
process.stdout.write(JSON.stringify(customers, null, 2));
