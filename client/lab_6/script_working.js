

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const rname = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => rname.push(...data));

function findMatches(wordToMatch, rname) {
  return rname.filter((rest) => {
    // here we need to figure out if the city or state matches what was searched
    const regex = new RegExp(wordToMatch, 'gi');
    return rest.name.match(regex) || rest.category.match(regex) || rest.address_line_1.match(regex) || rest.city.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, rname);
  const html = matchArray.map((rest) => {
    const regex = new RegExp(this.value, 'gi');
    const restName = rest.name;
    const categoryName = rest.category;
    const addressl1=rest.address_line_1;
    const zipc = rest.zip;
    const cit = rest.city;
    return `
      <li>
        <span class="name">${restName} <br/> ${categoryName} <br/> ${addressl1} <br/> ${cit} <br/> ${zipc} <br/> ,</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
let searchInput = document.querySelector('.search');
let suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
