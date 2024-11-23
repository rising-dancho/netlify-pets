// weather
const temp = document.querySelector('#weather-temp');
const weather_condition = document.querySelector('#weather-condition');
const icon = document.querySelector('#weather-icon');
const if_error = document.querySelector('#if-error');

async function weather() {
  try {
    const weatherPromise = await fetch(
      'https://weather-pets-adoption-see6.vercel.app/weather'
    );
    const weatherData = await weatherPromise.json();

    const { temp_c, condition } = weatherData.current;

    temp.textContent = `${temp_c}°C`;
    weather_condition.textContent = condition.text;
    icon.src = condition.icon;
  } catch (error) {
    // Check if the error is related to a network issue (timeout)
    if (error.message.includes('Failed to fetch')) {
      // Style the error message
      if_error.style.display = 'block';
      if_error.style.color = '#30080c';
      if_error.style.backgroundColor = '#F8D7DA';
      if_error.style.padding = '10px';
      if_error.style.border = '2px solid #e6707c';
      if_error.style.borderRadius = '5px';
      if_error.style.fontweight = '900';
      if_error.style.marginTop = '12px';

      if_error.textContent =
        "Whoops! We can't seem to get the weather forecast right now. Please try again later.. ✌️";
    } else {
      if_error.style.display = 'block';
      if_error.style.color = '#332700';
      if_error.style.backgroundColor = '#FFF3CD';
      if_error.style.padding = '10px';
      if_error.style.border = '1px solid #ffdb66';
      if_error.style.borderRadius = '5px';
      if_error.style.fontweight = '900';
      if_error.style.marginTop = '12px';

      if_error.textContent =
        'Whoops! There was an unexpected error fetching the weather data. Please try again later.. ✌️';
    }

    // Optional: log the full error for debugging
    console.error('Fetch error:', error);
  }
}

weather();

// pet area
const pet_area = document.querySelector('.pet-cards-container');
const template = document.querySelector('#pet-card-template');
const wrapper = document.createDocumentFragment();

async function petsArea() {
  const petsPromise = await fetch(
    'https://adfinem-pets-adoption.netlify.app/.netlify/functions/pets'
  );

  const petsData = await petsPromise.json();

  petsData.forEach((pet) => {
    // INEFFICIENT APPROACH:
    //   const petCard = `<div class="pet-card">
    //   <div class="pet-details-container">
    //     <h3>${pet.name}</h3>
    //     <p>${pet.description}
    //     </p>
    //     <span>${pet.birthYear}</span>
    //   </div>
    //   <img src=${pet.photo} alt=${pet.species}
    // </div>`;
    //   // append the cards to the container
    //   pet_area.innerHTML += petCard;

    // EFFICIENT APPROACH:
    const clone = template.content.cloneNode(true);

    clone.querySelector('.pet-card').dataset.species = pet.species;

    clone.querySelector('h3').textContent = pet.name;
    clone.querySelector('.pet-description').textContent = pet.description;
    clone.querySelector('.pet-age').textContent = calculateAge(pet.birthYear);

    if (!pet.photo) pet.photo = './images/fallback.jpg';

    clone.querySelector('.pet-card-photo img').src = pet.photo;
    clone.querySelector(
      '.pet-card-photo img'
    ).alt = `A ${pet.species} named ${pet.name}`;

    wrapper.appendChild(clone);
  });

  pet_area.appendChild(wrapper);
}

petsArea();

function calculateAge(birthYear) {
  const current_year = new Date().getFullYear();
  const age = current_year - birthYear;

  if (age === 1) return '1 year old';
  if (age < 1) return 'Less than a year old';

  return `${age} years old`;
}

// all pet filter buttons
const allFilterButtons = document.querySelectorAll(
  '.filter-buttons-wrapper button'
);

allFilterButtons.forEach((button) => {
  button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(e) {
  // remove active class from any and all buttons
  allFilterButtons.forEach((button) => button.classList.remove('active'));

  // add active class to the specific button that just got clicked
  e.target.classList.add('active');

  // actually filter the pets down below
  const currentFilter =
    e.target.dataset
      .filter; /* getting the button that was clicked using data- html property */

  // loop through all the pet-cards
  document.querySelectorAll('.pet-card').forEach((el) => {
    console.log(currentFilter, el.dataset.species);
    if (currentFilter === el.dataset.species || currentFilter === 'all') {
      el.style.display = 'grid';
    } else {
      el.style.display = 'none';
    }
  });
}

// API reference: https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2#/APIs/realtime-weather
