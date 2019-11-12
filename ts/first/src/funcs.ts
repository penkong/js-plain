//

const add = (a: number, b: number): number => {
  return a + b;
};

function divide(a: number, b: number): number {
  return a / b;
}

const multi = function(a: number, b: number): number {
  return a * b;
};

const logger = (message: string): void => {
  console.log(message);
  // can return null or undefined;
};

// error never return anything;
const throwError = (message: string): never => {
  throw new Error(message);
};
const throwError2 = (message: string): string => {
  if (!message) throw new Error(message);
  return message;
};
// ---------------------------------------------------------------------
const forecast = {
  date: new Date(),
  weather: "sunny"
};

// destructure

// const logWeather = (forecast: { date: Date, weather: string }): void => {
//   console.log(forecast.date);
//   console.log(forecast.weather);
// }
const logWeather = ({
  date,
  weather
}: {
  date: Date;
  weather: string;
}): void => {
  console.log(date);
  console.log(weather);
};
