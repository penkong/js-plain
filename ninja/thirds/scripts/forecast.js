//
const obj = {
  currConditionURL: 'http://dataservice.accuweather.com/currentconditions/v1/',
  textSearchURL:
    'http://dataservice.accuweather.com/locations/v1/cities/search',
  api: 'GajANT8N7J5fThNb9oG6h68tlGzFy5UK'
};

const getWeather = async keyOf => {
  const { currConditionURL, api } = obj;
  const response = await fetch(`${currConditionURL}${keyOf}?apikey=${api}`);
  const data = await response.json();
  return data[0];
};

const getCity = async city => {
  const { textSearchURL, api } = obj;
  const base = `${textSearchURL}`;
  const query = `?apikey=${api}&q=${city}`;
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
const key = getCity('berlin')
  .then(data => {
    return getWeather(data.Key);
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));
