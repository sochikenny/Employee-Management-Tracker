const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const env = require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "Employee_TrackDB"
});

connection.connect(function(err) {
  if (err) throw err;
});



