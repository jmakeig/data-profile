// const doc = {
//   a: 'A' /* 1 */,
//   b: 'B' /* 1 */,
//   c: ['C0' /* 1 */, 'C1', /* 2 */ 'C2' /* 3 */],
//   d: [
//     { e: 'E0', f: 'F0' } /* 1 */,
//     { e: 'E1', f: 'F1' } /* 2 */,
//     { e: 'E2', f: 'F2', k: [1, 2, 3] } /* 3, 4, 5 */,
//     { e: 'E3', f: 'F3' } /* 4 */,
//   ],
//   g: { h: { i: 'I', j: 'J' } } /* 1 */,
// };

// document.addEventListener('DOMContentLoaded', evt => {
//   fetch('customers.json')
//     .then(response => {
//       if (200 === response.status) {
//         return response.json();
//       } else {
//         throw new Error(
//           'Did you generate the fake customers with npm run generate?'
//         );
//       }
//     })
//     .then(customers => {
//       console.log(tabulate.array(customers));
//     })
//     .catch(error => console.error(error));
// });

function toColumns(data) {
  const SEPERATOR = '.';
  const EMPTY = Symbol.for('EMPTY');

  function traverse(item, path, index) {
    if (isPrimitiveOrNull(item)) {
      pushPath(index, path, item);
    } else if (Array.isArray(item)) {
      if (0 === item.length) {
        pushPath(index, `${path}[]`, EMPTY);
      } else {
        for (let i = 0; i < item.length; i++) {
          traverse(item[i], `${path}[${i}]`, index);
        }
      }
    } else {
      for (let p in item) {
        traverse(item[p], [path, p].join(SEPERATOR), index);
      }
    }
  }

  const result = {};

  /**
   *
   * @param {number} index - the index of the top-level item
   * @param {string} path - path string
   * @param {*} value - primitive value
   */
  function pushPath(index, path, value) {
    console.log(index, path, value);
  }

  for (let i = 0; i < data.length; i++) {
    traverse(data[i], '', i);
  }
}
const doc = [
  { name: { first: 'F0', last: 'L0' }, notes: [] },
  { name: {}, notes: [{ a: 'A0', b: 'B0' }, { a: 'A1', b: 'B1' }] },
  { name: { first: 'F2', last: 'L2' }, notes: [] },
];

console.log(JSON.stringify(doc, null, 2));
console.log(tabulate.array(doc));
// console.log(toColumns(doc));
