const request = require("request");
const keys = require("../config/keys");

const forecast = (location, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    keys.weatherStackAPI +
    "&query=" +
    location +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    const { current, location, error: apiError } = body;
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (apiError) {
      const { info: errorDescription } = apiError;
      callback(errorDescription, undefined);
    } else {
      const { weather_descriptions, temperature, precip, feelslike } = current;
      const { name } = location;
      weatherDescription = "";
      if (weather_descriptions.length > 1) {
        weather_descriptions.forEach((description) => {
          weatherDescription += description.toLowerCase() + " ";
        });
      } else {
        weatherDescription = weather_descriptions[0] + " ";
      }
      callback(undefined, {
        location: name,
        time: location.localtime,
        icon_url: current.weather_icons[0],
        forecast: `It is currently ${weatherDescription.toLowerCase()}in ${name}, ${temperature} degrees, and ${precip} % chance of rain. It feels like ${feelslike} degrees`,
      });
    }
  });
};

module.exports = forecast;
