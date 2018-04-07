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

  function traverse(item, header, path) {
    if (isPrimitiveOrNull(item)) {
      pushPath(header, path, item);
    } else if (Array.isArray(item)) {
      if (0 === item.length) {
        pushPath(header, `${path}[]`, EMPTY);
      } else {
        for (let i = 0; i < item.length; i++) {
          traverse(item[i], header, `${path}[${i}]`);
        }
      }
    } else {
      const props = Object.getOwnPropertyNames(item);
      if (0 === props.length) {
        pushPath(header, path, EMPTY);
      } else {
        for (let p = 0; p < props.length; p++) {
          traverse(
            item[props[p]],
            [header, props[p]].join(SEPERATOR),
            [path, props[p]].join(SEPERATOR)
          );
        }
      }
    }
  }

  const columns = {};

  function pushPath(header, path, value) {
    console.log(header, path, value);
    if (undefined === columns[header]) {
      columns[header] = {};
    }
    columns[header][path] = value;
  }

  // for (let i = 0; i < data.length; i++) {
  //   traverse(data[i], '', '');
  // }
  traverse(data, '', '');
  return columns;
}

function toRows(cols) {
  const rows = [];
  function traverse(columns) {
    const row = [];
    for (let col in columns) {
    }
  }
  function addRow(row) {
    rows.push(row);
  }
  traverse(cols);
  return rows;
}

/**
 * Shallow copy of all but one property.
 *
 * @param {object} obj
 * @param {string} [prop]
 * @return {object}
 */
function allBut(obj, prop) {
  const tmp = Object.assign({}, obj);
  if (prop) delete tmp[prop];
  return tmp;
}

function startsWith(path, index) {
  const segments = path.split('.');
  return segments[0] === `[${index}]`;
}
// const doc = [
//   { name: { first: 'F0', last: 'L0' }, notes: [] },
//   { name: {}, notes: [{ a: 'A0', b: 'B0' }, { a: 'A1', b: 'B1' }] },
//   { name: { first: 'F2', last: 'L2' }, notes: [] },
// ];

const docs = [
  {
    id: 'e7e9879a-d242-40d1-a697-d12306e2b992',
    name: {
      first: 'Ruben',
      last: 'Hamill',
    },
    address: {
      street: '6758 Marvin Greens',
      city: 'Marianotown',
      zip: '82435-8332',
    },
    notes: [
      {
        timestamp: '2018-03-18T09:53:21.698Z',
        text: 'Magnam hic vitae id corrupti ea voluptas accusamus minima nam.',
        things: [1, [2, 2, { stuff: 2 }], 3],
      },
      {
        timestamp: '2018-03-18T11:36:54.486Z',
        text: 'Nihil non quasi ullam repellendus magni.',
      },
      {
        timestamp: '2018-03-19T04:44:55.980Z',
        text:
          'Consectetur dolorem veniam nam voluptates explicabo soluta asperiores vitae id.',
        things: [4, 5, [6, { stuff: 6 }, 6]],
      },
    ],
    verified: false,
  },
  {
    id: '30d623ff-a0af-4730-a231-42a984d535be',
    name: {
      first: 'Domingo',
      last: 'Streich',
    },
    address: {
      street: '658 Jennie Ford',
      city: 'Anissaborough',
      zip: '19746',
    },
    notes: [],
    verified: true,
  },
];

console.log(JSON.stringify(docs, null, 2));
console.log(tabulate.array(docs));
const cols = toColumns(docs);
console.log(cols);
// const rows = toRows(cols);
// console.log(rows);
