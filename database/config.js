const mysql = require('mysql');

// config db connection
dbConnection = mysql.createConnection({
    host: "db4free.net",
    database: 'weather_db',
    user: "admin_db",
    password: "12345678"
  });
  
  // connect to database
  dbConnection.connect( (err) => {
    if (err) throw err;
    console.log("Database Connected!");
  });


  module.exports = dbConnection;