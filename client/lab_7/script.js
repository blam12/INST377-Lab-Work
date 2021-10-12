async function dataHandler() {}

async function windowActions() {
  const request = await fetch(endpoint);
  const arrayName = await request.json();
  mapInit();
}
const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const rname = [];

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => rname.push(...data));

function findMatches(wordToMatch, rname) {
  return rname.filter((rest) => {
    const regex = new RegExp(wordToMatch, 'gi');
    return rest.zip.match(regex);
  });
}
let testevent = '';
function displayMatches(event) {
  event.preventDefault();
  const matchArray = findMatches(event.target[0].value, rname).splice(0, 5);
  console.log(event);
  testevent=event;
  const html = matchArray.map((rest) => {
    const regex = new RegExp(event.target[0].value, 'gi');
    const restName = rest.name;
    const categoryName = rest.category;
    const addressl1 = rest.address_line_1;
    const zipc = rest.zip;
    const cit = rest.city;
    const geo = rest.geocoded_column_1;
    let marker = L.marker([geo.coordinates[1], geo.coordinates[0]]).addTo(mymap);
    return `
      <li>
        <span class="name">${restName} <br/> ${addressl1} <br/> </span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
const searchInput = document.querySelector('.search-form');
let suggestions = document.querySelector('.suggestions');

function empty(event) {
  if (event.target[0].value === '') {
    suggestions.innerHTML = '';
  }
}

// searchInput.addEventListener('submit', displayMatches);
// searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
searchInput.addEventListener('submit', (evt) => { displayMatches(evt);});
searchInput.addEventListener('submit', empty);


window.onload = windowActions;

const mymap = L.map('mapid').setView([38.937661 , -76.944736], 13);


function mapInit() {
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYmxhbTEyIiwiYSI6ImNrdW5pNDU2NTJyamEycHQ5azJnbnBueWMifQ.j6CqoYsW3ty-0chK3eFQXA'
  }).addTo(mymap);

}
