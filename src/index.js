const populateResults = (results) => {
  const resultsSection = document.querySelector('.results')
  results.forEach(result => {
    const resultTitle = `<p>${result.name}</p>`
    resultsSection.innerHTML += resultTitle
  })
}

const searchPeople = (searchTerm) => {
  return fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      populateResults(data.results)
    })
    .catch(error => console.log(error))
}

const search = event => {
  const searchInput = document.querySelector('.search-input')
  searchPeople(searchInput.value)

  event.preventDefault()
}

const form = document.querySelector('.search-form')
form.addEventListener('submit', search)
