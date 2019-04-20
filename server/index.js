const express = require('express');
const { fetchWeatherData } = require('./api');
const dbConnection = require('../database/config');
const { destructionWeatherData, writeToWeatherFile } = require('./helpers');
const { insertIntoWeatherTable } = require('../database/index');

const app = new express();

// funtion to log  to file and insert into db
let log = async () => {

  // fetch weatehr data from API 
  let weatherData = await fetchWeatherData();
  // destruction  weather data
  weatherData = destructionWeatherData(weatherData);
  // implement write file promise
  let writeFilePromise = new Promise((resolve, reject) => {
    writeToWeatherFile(weatherData, (err, result) => {
      if (err) throw reject(err);
      resolve();
    })
  }).then(() => {
    console.log("Successfully Written to File.");
  }).catch((err) => {
    console.log(err);
  });

  // implement insert into weather Table in db promise
  let insertIntoWeatherTablePromise = new Promise((resolve, reject) => {
    insertIntoWeatherTable(weatherData, (err, result) => {
      if (err) reject(err);
      resolve();
    })
  }).then(() => {
    console.log('Successfull insert into database');
  }).catch((err) => {
    console.log(err);
  }); 

  // apply promise all to all promises
  Promise.all([writeFilePromise, insertIntoWeatherTablePromise]).then(() => {
    console.log('Done!')
  })

}

// set interval to excute log function each 5 minute
setInterval(() => {
  log();
}, 600000)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.error(`Server listening on port ${PORT}`);
})