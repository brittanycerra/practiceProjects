const submitButton = document.getElementById('submit');
const resultsList = document.querySelector('#results ul');

function buttonClick(event){
  event.preventDefault();

  // Clear previous results
  resultsList.textContent = ``;

  let searchValue = document.getElementById('search-box').value;

  let request = buildQuery(searchValue);

  fetch(request)
    .then(response => response.json())
    .then(data => {
      for(let title of data.query.search){
        let newListing = document.createElement('li');
        let newLink = document.createElement('a');
        newLink.setAttribute('href', `https://en.wikipedia.org/wiki/${title.title}`);
        newLink.textContent = title.title;
        newListing.appendChild(newLink);
        resultsList.appendChild(newListing);

      }
      
    }).catch(err => console.log(err));

  document.getElementById('search-box').value = ``;
  
}

function buildQuery(str){
  // Only accept letters, encode spaces
  let result = "https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&srsearch=" + str + "&format=json";

  return result;
}

submitButton.addEventListener("click", buttonClick);