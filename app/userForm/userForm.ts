import { UserFormData } from "../model/userFormData.model.js";
import { UserOverviewServices } from "../services/userOverview.service.js";
const userOverviewServices = new UserOverviewServices();


function initializeForm() {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  if (id) {
    const submitButton = (document.querySelector("#submitButton") as HTMLButtonElement)
    submitButton.addEventListener("click", () => submit(id))
    getById(id);
  }
  else {
    const submitButton = (document.querySelector("#submitButton") as HTMLButtonElement)
    submitButton.addEventListener("click", () => submit())
  }

  const cancelButton = document.querySelector("#cancelButton")
  cancelButton.addEventListener("click", function () {
    window.location.href = '../userOverview/userOverview.html'
  })
}

function getById(id?: string): void {
  userOverviewServices.getById(id)
    .then(user => {
      (document.querySelector('#username') as HTMLInputElement).value = user.username;
      (document.querySelector('#firstName') as HTMLInputElement).value = user.firstName;
      (document.querySelector('#lastName') as HTMLInputElement).value = user.lastName;
      (document.querySelector('#dateOfBirth') as HTMLInputElement).value = user.dateOfBirth;
    }).catch(error => {
      console.error(error.status, error.text);
    })

}

function submit(id?: string) {
  const username = (document.querySelector('#username') as HTMLInputElement).value
  const firstName = (document.querySelector('#firstName') as HTMLInputElement).value
  const lastName = (document.querySelector('#lastName') as HTMLInputElement).value
  const dateOfBirth = (document.querySelector('#dateOfBirth') as HTMLInputElement).value

  const userFormData: UserFormData = { username, firstName, lastName, dateOfBirth };

  const usernameErrorMessage = document.querySelector('#usernameError')
  usernameErrorMessage.textContent = ''
  const firstNameErrorMessage = document.querySelector('#firstNameError')
  firstNameErrorMessage.textContent = ''
  const lastNameErrorMessage = document.querySelector('#lastNameError')
  lastNameErrorMessage.textContent = ''
  const dateOfBirthErrorMessage = document.querySelector('#dateOfBirthError')
  dateOfBirthErrorMessage.textContent = ''

  if (userFormData.username.trim() === '') {
    usernameErrorMessage.textContent = 'ERROR: Username filed is required.'
    return
  }
  if (userFormData.firstName.trim() === '') {
    firstNameErrorMessage.textContent = 'ERROR: FirstName filed is required.'
    return
  }
  if (userFormData.lastName.trim() === '') {
    lastNameErrorMessage.textContent = 'ERROR: LastName filed is required.'
    return
  }
  if ((userFormData.dateOfBirth as unknown as string).trim() === '') {
    dateOfBirthErrorMessage.textContent = 'ERROR: DateOfBirth filed is required.'
    return
  }

  if (id) {
    userOverviewServices.update(id, userFormData)
      .then(() => {
        window.location.href = '../index.html'
      }).catch(error => {
        console.error(error.status, error.text);
      })
  }
  else {
    const loadingGif = document.querySelector(".loading") as HTMLImageElement
    loadingGif.style.display = "flex"

    const submitButton = document.querySelector("#submitButton") as HTMLButtonElement
    submitButton.style.backgroundColor = "gray";
    submitButton.disabled = true

    userOverviewServices.add(userFormData)
      .then(() => {
        loadingGif.style.display = "none"
      }).catch(error => {
        console.error(error.status, error.message);
      })
  }
}



document.addEventListener('DOMContentLoaded', initializeForm)