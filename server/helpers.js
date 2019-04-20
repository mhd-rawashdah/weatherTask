var fs = require("fs");

// function to destruction weather object and return object with specific data
module.exports.destructionWeatherData = (weatherData) => {
    let { last_updated, temp_c, condition, wind_mph } = weatherData.current;
    return {
        last_updated: last_updated,
        temp_c: temp_c,
        weather_status: condition.text,
        wind_mph: wind_mph,
    }
}

// function to write into weather.log file
module.exports.writeToWeatherFile = (weatherObj, callback) => {
    fs.writeFile("weather.log", JSON.stringify(weatherObj), (err, result) => {
        if(err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });

}