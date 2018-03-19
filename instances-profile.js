const store = {};

function renderCustomers(customers) {
  return customers.map((customer, index) =>
    tr(
      td(
        { dataset: { parent: 'customer.id' }, className: 'atomic' },
        customer.id
      ),
      td(
        { dataset: { parent: 'customer.name.first' }, className: 'atomic' },
        customer.name.first
      ),
      td(
        {
          dataset: { parent: 'customer.name.last' },
          className: 'atomic',
          className: 'atomic',
        },
        customer.name.last
      ),
      td(
        { dataset: { parent: 'customer.address.street' } },
        customer.address.street
      ),
      td(
        { dataset: { parent: 'customer.address.city' }, className: 'atomic' },
        customer.address.city
      ),
      td(
        { dataset: { parent: 'customer.address.zip' }, className: 'atomic' },
        customer.address.zip
      ),
      td(
        { dataset: { parent: 'customer.notes' } },
        attr('colspan', 2),
        renderNotes(customer.notes)
      ),
      td(
        { dataset: { parent: 'customer.verified' }, className: 'atomic' },
        String(customer.verified)
      )
    )
  );
}

function renderNotes(notes) {
  return table(
    { className: 'entity' },
    // notes.length ? thead(tr(th('timestamp'), th('text'))) : undefined,
    tbody(
      notes.map(note =>
        tr(
          td(note.timestamp, { className: 'atomic' }),
          td(note.text, { className: 'atomic' })
        )
      )
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
