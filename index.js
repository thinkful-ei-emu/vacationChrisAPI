'use strict';
/*eslint-env jquery*/

const apiKey = 'GTE66Gkucwkd0Ps9hXMGECytiIzaveqfngd2jTb8';
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function getNews(query, maxResults=10) {
  const queryString = `stateCode=${query}&limit=10&api_key=${apiKey}`;
  const url = searchURL + '?' + queryString;
 
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

/**
 * Appends formatted HTML results to the page
 */ 
function displayResults(responseJson, maxResults) {
  console.log('responseJson: ',responseJson);
  // clear the error message
  $('#js-error-message').empty();
  // if there are previous results, remove them
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  responseJson.data.forEach(data => {
    // For each object in the articles array:
    // Add a list item to the results list with 
    // the article title, source, author,
    // description, and image
    $('#results-list').append(
      `
          <li><h3><a href="${data.url}">${data.fullName}</a></h3>
          <p>${data.name}</p>
          <p>Directions: <a href="${data.directionsUrl}" target="blank">Link</a></p>
          <p>${data.description}</p>
          </li>
        `
    );
  });
  // unhide the results section  
  $('#results').removeClass('hidden');
}

/**
 * Handles the form submission
 */
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
  });
}
  
$(watchForm);