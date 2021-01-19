const populateResults = (results) => {
  const resultsSection = document.querySelector('.results')
  resultsSection.innerHTML = ''
  results.forEach(result => {
    const resultTitle = `<p>${result.name}</p>`
    resultsSection.innerHTML += resultTitle
  })
}

const populateErrorMessage = message => {
  const messages = document.querySelector('.messages')
  messages.innerText = message
}

const searchPeople = (searchTerm) => {
  if (searchTerm === '') {
    return populateErrorMessage('Please enter a valid search term')
  }

  const checkResponse = (response) => {
    if (!response.ok) {
      return populateErrorMessage('Something went wrong. Please try again')
    }
  }

  return fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
    .then(response => {
      // use case for bad request - 422 etc.
      checkResponse(response)
      return response.json()
    })
    .then(data => {
      // use case for empty results
      if (data.results.length > 0) {
        populateResults(data.results)
      } else {
        populateErrorMessage(`No results for search term ${searchTerm}`)
      }
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
