const dbConnection = require('./config');

// function to insert into weather table in database
module.exports.insertIntoWeatherTable = (weatherObj, callback) => {
    const sqlQurey = `insert into weather (last_updated, temp_c, weather_status, wind_mph)
    values ('${weatherObj.last_updated}', '${weatherObj.temp_c}', '${weatherObj.weather_status}', '${weatherObj.wind_mph}')`;

    dbConnection.query (sqlQurey, (err, result) => {
        if(err) {
            callback(err, null)
        } else {
            callback(null,result);
        }
    })

}