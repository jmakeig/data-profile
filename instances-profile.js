const store = {};

function renderCustomers(customers) {
  return customers.map((customer, index) =>
    tr(
      td(
        attr('rowspan', 2),
        { dataset: { parent: 'customer.id' }, className: 'atomic' },
        customer.id
      ),
      td(attr('rowspan', 2),
        { dataset: { parent: 'customer.name.first' }, className: 'atomic' },
        customer.name.first
      ),
      td(attr('rowspan', 2),
        {
          dataset: { parent: 'customer.name.last' },
          className: 'atomic',
          className: 'atomic',
        },
        customer.name.last
      ),
      td(attr('rowspan', 2),
        { dataset: { parent: 'customer.address.street' } },
        customer.address.street
      ),
      td(attr('rowspan', 2),
        { dataset: { parent: 'customer.address.city' }, className: 'atomic' },
        customer.address.city
      ),
      td(
        attr('rowspan', 2),
        { dataset: { parent: 'customer.address.zip' }, className: 'atomic' },
        customer.address.zip
      ),
      td(
        { dataset: { parent: 'customer.notes' } },
        renderNotes([
          { timestamp: 1, text: 'one' },
          { timestamp: 2, text: 'two' },
        ])
      ),
      td(
        { dataset: { parent: 'customer.verified' }, className: 'atomic' },
        String(customer.verified)
      )
    )
  );
}

function renderNotes(notes) {
  return;
  notes.map(note =>
    tr(
      td(note.timestamp, { className: 'atomic' }),
      td(note.text, { className: 'atomic' })
    )
  );
}

document.addEventListener('DOMContentLoaded', evt => {
  fetch('customers.json')
    .then(response => {
      if (200 === response.status) {
        return response.json();
      } else {
        throw new Error(
          'Did you generate the fake customers with npm run generate?'
        );
      }
    })
    .then(customers =>
      replaceChildren(
        document.querySelector('tbody'),
        renderCustomers(customers)
      )
    )
    .catch(error => console.error(error));
  document
    .querySelector('table')
    .addEventListener('click', evt => console.log(evt.target));
});
