const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shubham",
});

connection.connect((err) => {
  if (err) {
    console.log("error to connecting the database", err);
  } else {
    console.log("Connected the successfully");
  }
});
//connection.connect();

module.exports = connection.promise();
