//
class ForeCast {
  constructor() {
    this.key = 'GajANT8N7J5fThNb9oG6h68tlGzFy5UK';
    this.textSearchURL =
      'http://dataservice.accuweather.com/locations/v1/cities/search';
    this.currConditionURL =
      'http://dataservice.accuweather.com/currentconditions/v1/';
  }

  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);
    return {
      cityDets,
      weather
    };
  }

  async getCity(city) {
    const query = `?apikey=${this.api}&q=${city}`;
    const response = await fetch(this.textSearchURL + query);
    const data = await response.json();
    return data[0];
  }

  async getWeather(id) {
    const response = await fetch(
      `${this.currConditionURL}${id}?apikey=${this.api}`
    );
    const data = await response.json();
    return data[0];
  }
}

// ------------------------------------------------------------------
