import { User } from "../model/user.model.js";
import { UserOverviewServices } from "../services/userOverview.service.js";
const userOverviewServices = new UserOverviewServices();

function initializeOverview(): void {
  const tableButton = document.querySelector(".tableButton")
  tableButton.addEventListener("click", () => {
    window.location.href = "../userForm/userForm.html"
  })
  getAll();
}

function getAll(): void {
  userOverviewServices.getAll()
    .then((users: User[]) => renderData(users))
    .catch(error => {
      console.error(error.status, error.message);
    });
}

function renderData(data: User[]) {
  const table = document.querySelector('table tbody')
  table.innerHTML = ''

  data.forEach((user: User) => {
    const newRow = document.createElement('tr')

    const cell1 = document.createElement('td')
    cell1.textContent = user.username
    newRow.appendChild(cell1)

    const cell2 = document.createElement('td')
    cell2.textContent = user.firstName
    newRow.appendChild(cell2)

    const cell3 = document.createElement('td')
    cell3.textContent = user.lastName
    newRow.appendChild(cell3)

    const cell4 = document.createElement('td')
    cell4.textContent = user.dateOfBirth
    newRow.appendChild(cell4)

    const cell5 = document.createElement('td')
    const editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.className = 'tableButton'
    editButton.addEventListener('click', function () {
      window.location.href = '../userForm/userForm.html?id=' + user['id']
    })
    cell5.appendChild(editButton)
    newRow.appendChild(cell5)

    const cell6 = document.createElement('td')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.className = 'tableButton'
    deleteButton.addEventListener('click', () => userOverviewServices.delete(user))
    cell6.appendChild(deleteButton)
    newRow.appendChild(cell6)

    table.appendChild(newRow)
  })
}

document.addEventListener("DOMContentLoaded", () => initializeOverview());