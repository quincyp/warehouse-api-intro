const log = document.querySelector('#log')

function listAll() {
  fetch('http://localhost:3000/inventory/retrieve-all', {
    method: 'GET',
  })
  .then((response) => response.text())
  .then((text) => log.innerHTML = text)
}

function listItem() {
  const itemName = document.querySelector('#list-item-name').value
  fetch(`http://localhost:3000/inventory/retrieve/${itemName}`, {
    method: 'GET',
  })
  .then((response) => response.text())
  .then((text) => log.innerHTML = text)
}

function addNewItem() {
  const itemName = document.querySelector('#add-item-name').value
  const itemCount = +document.querySelector('#add-item-count').value
  fetch('http://localhost:3000/inventory/add', {
    method: 'POST',
    body: JSON.stringify({
      name: itemName,
      count: itemCount,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.text())
  .then((text) => log.innerHTML = text)
}

function increaseItemCount() {
  const itemName = document.querySelector('#change-item-name').value
  fetch('http://localhost:3000/inventory/change', {
    method: 'PUT',
    body: JSON.stringify({
      name: itemName,
      change: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.text())
  .then((text) => log.innerHTML = text)
}

function decreaseItemCount() {
  const itemName = document.querySelector('#change-item-name').value
  fetch('http://localhost:3000/inventory/change', {
    method: 'PUT',
    body: JSON.stringify({
      name: itemName,
      change: -1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.text())
  .then((text) => log.innerHTML = text)
}

function removeItem() {
  const itemName = document.querySelector('#remove-item-name').value
  fetch(`http://localhost:3000/inventory/remove/${itemName}`, {
    method: 'DELETE',
  })
  .then((response) => response.text())
  .then((text) => log.innerHTML = text)
}

document.querySelector('#list-all-button').addEventListener('click', listAll)
document.querySelector('#list-item-button').addEventListener('click', listItem)
document.querySelector('#add-item-button').addEventListener('click', addNewItem)
document.querySelector('#increase-item-button').addEventListener('click', increaseItemCount)
document.querySelector('#decrease-item-button').addEventListener('click', decreaseItemCount)
document.querySelector('#remove-item-button').addEventListener('click', removeItem)