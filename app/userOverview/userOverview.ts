import { User } from "../model/user.model.js";
import {userOverviewServices} from "../services/userOverview.service.js";
let userOverviewService = new userOverviewServices();

function getAll(): void {
  userOverviewService.getAll()
  .then((users: User[]) => renderData(users))
}

function renderData(data: User[]) {
  let table = document.querySelector('table tbody')
  table.innerHTML = ''

  data.forEach((user: User) => {
    let newRow = document.createElement('tr')

    let cell1 = document.createElement('td')
    cell1.textContent = user.username
    newRow.appendChild(cell1)

    let cell2 = document.createElement('td')
    cell2.textContent = user.firstName
    newRow.appendChild(cell2)

    let cell3 = document.createElement('td')
    cell3.textContent = user.lastName
    newRow.appendChild(cell3)

    let cell4 = document.createElement('td')
    cell4.textContent = user.dateOfBirth
    newRow.appendChild(cell4)

    let cell5 = document.createElement('td')
    let editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.className = 'tableButton'
    editButton.addEventListener('click', function () {
      window.location.href = '../userForm/userForm.html?id=' + user['id']
    })
    cell5.appendChild(editButton)
    newRow.appendChild(cell5)

    let cell6 = document.createElement('td')
    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.className = 'tableButton'
    deleteButton.addEventListener('click', function () {
      fetch('http://localhost:46211/api/user/' + user['id'], { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            const error = new Error('ERROR: Status: ' + response.status)
            throw error
          }
          getAll()
        })
        .catch(error => {
          console.error('Error:', error.message)
          if (error.response && error.response.status === 404) {
            alert('ERROR: user ne postoji!')
          } else {
            alert('ERROR: Došlo je do greške pri brisanju usera. Probajte ponovo.')
          }
        })
    })
    cell6.appendChild(deleteButton)
    newRow.appendChild(cell6)

    table.appendChild(newRow)
  })
}

getAll();