//
// get stored location
const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation.city, weatherLocation.state);
const ui = new UI();
// get when on dom load
document.addEventListener('DOMContentLoaded', getWeather);

function getWeather() {
  weather
    .getWeather()
    .then(results => {
      // from ui
      ui.paint(results);
    })
    .catch();
}

// change location eve
document.getElementById('w-change-btn').addEventListener('click', () => {
  //
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  weather.changeLocation(city, state);
  // set location
  storage.setLocationData(city, state);
  //
  getWeather();

  // close modal
  $('#locModal').modal('hide');
});
