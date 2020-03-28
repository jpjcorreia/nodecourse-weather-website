const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/a559106e9cd0f27bb5d004ef3ef9543c/" +
    longitude +
    "," +
    latitude +
    "?units=si&lang=pt";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to call forecast services.", undefined);
    } else if (body.error) {
      callback("Location not found.", undefined);
    } else {
      const temp = body.currently.temperature;
      const rainChance = body.currently.precipProbability;
      const summary = body.daily.data[0].summary;
      const uvIndex = body.daily.data[0].uvIndex;

      callback(undefined, {
        forecast: summary + " It is currently " + temp + " degrees out." + " There is a " + rainChance + "% chance of rain. UV Index for today is: " + uvIndex
      });
    }
  });
};

module.exports = forecast;
