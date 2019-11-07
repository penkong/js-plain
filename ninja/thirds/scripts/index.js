//
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forCast = new ForeCast();

const updateUI = data => {
  const {
    cityDets: { EnglishName },
    weather: {
      WeatherIcon,
      IsDayTime,
      WeatherText,
      Temperature: {
        Metric: { Value }
      }
    }
  } = data;

  details.innerHTML = `
    <h5 class="my-3">${EnglishName}</h5>
    <div class="my-3">${WeatherText}</div>
    <div class="display-4 my-4">
      <span>${Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // icon src;
  const iconsSrc = `img/icons/${WeatherIcon}.svg`;
  icon.setAttribute('src', iconsSrc);
  // image src;
  let timeSrc = null;
  IsDayTime ? (timeSrc = 'img/day.svg') : (timeSrc = 'img/night.svg');
  time.setAttribute('src', timeSrc);

  // remove d-none
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

cityForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityForm.city.value.trim();

  cityForm.reset();

  // update ui with new city
  foreCast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  // set local strogage
  localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
  foreCast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
