class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelsLike = document.getElementById('w-feels-like');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.wind = document.getElementById('w-wind');
  }

  paint(weather) {
    this.location.textContent = weather.display_location.full;
    this.des.textContent = weather.weather;
    this.string.textContent = weather.temprature_string;
    this.icon.setAttribute('src', weather.icon_url);
    this.humidity.textContent = `Relative Humidity ${weather.relative_humidity}`;
    this.feelsLike.textContent = `Relative Humidity ${weather.feelslike_string}`;
    this.dewpoint.textContent = `Relative Humidity ${weather.dewpoint_string}`;
    this.wind.textContent = `Relative Humidity ${weather.wind_string}`;
  }
}
