'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  // In case of misspelling or non-existent country
  request.addEventListener('loadend', function () {
    if (this.status == 404) {
      alert('You misspelled something, please try again');
    }
  });

  //getting values from XML request

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const name = data.name.common;
    const flag = data.flags.svg;
    const region = data.region;
    const language = Object.values(data.languages)[0];
    const currency = Object.values(data.currencies)[0].name;
    const html = `
  <article class="country">
    <img class="country__img" src="${flag}" />
    <div class="country__data">
      <h3 class="country__name">${name}</h3>
      <h4 class="country__region">${region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(2)} Million people</p>
      <p class="country__row"><span>🗣️</span>${language}</p>
      <p class="country__row"><span>💰</span>${currency}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
// prompt function
btn.addEventListener('click', function () {
  getCountryData(prompt('Please enter the name of the country'));
});
