const tableBody = document.querySelector('#table-body')
const doggoForm = document.querySelector('#dog-form')
const formDogName = document.querySelector('#dog-name')
const formDogBreed = document.querySelector('#dog-breed')
const formDogSex = document.querySelector('#dog-sex')

let currentDog = {}

const render = () => {
  fetch('http://localhost:3000/dogs')
  .then((response) => {
    return response.json()
  }).then((data) => {
    tableBody.innerHTML = ''
    for (let a = 0; a < data.length; a++) {
      let dogRow = document.createElement('tr')
      let dogDataName = document.createElement('td')
      let dogDataBreed = document.createElement('td')
      let dogDataSex = document.createElement('td')
      let dogDataEditButton = document.createElement('button')

      dogDataName.innerHTML = data[a].name
      dogDataBreed.innerHTML = data[a].breed
      dogDataSex.innerHTML = data[a].sex
      dogDataEditButton.innerHTML = 'Edit Doggo'

      dogDataEditButton.addEventListener('click', () => {
        formDogName.value = data[a].name
        formDogBreed.value = data[a].breed
        formDogSex.value = data[a].sex
        currentDog = data[a]
      })

      dogRow.id = `dog-${data[a].id}`
      dogRow.appendChild(dogDataName)
      dogRow.appendChild(dogDataBreed)
      dogRow.appendChild(dogDataSex)
      dogRow.appendChild(dogDataEditButton)

      tableBody.appendChild(dogRow)
    }
    doggoForm.addEventListener('submit', (e) => {
      e.preventDefault()
      updateDog()
    })
  })
}

const updateDog = () => {
  fetch(`http://localhost:3000/dogs/${currentDog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      name: formDogName.value,
      breed: formDogBreed.value,
      sex: formDogSex.value
    })
  }).then( render )
}

render()
