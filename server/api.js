const fetch = require('node-fetch');

// function to fetch data from weather Api 
module.exports.fetchWeatherData = async () => {
  const URL = "http://api.apixu.com/v1/current.json?key=2cb6b9c413914d02bc775202180507&q=Dubai";
  try {
    let response = await fetch(URL);
    let data = await response.json();
    return data;
  } catch (err){
    console.log(err);
  }
}