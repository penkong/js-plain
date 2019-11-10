class Weather {
  constructor(city, state) {
    this.apikey = 'apikey';
    this.city = city;
    this.state = state;
  }

  async getWeather() {
    const res = await fetch('url+apikey');
    const resData = await res.json();
    return resData;
  }

  // change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}
