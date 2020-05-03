const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
//const env = require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Fairfield19",
    database: "Employee_TrackDB"
    // host: process.env.DB_HOST,
    // port: 3306,
    // username: process.env.DB_USER,
    // password: process.env.DB_PASS,
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add employee",
                "Add department",
                "Add role",
                "View employees",
                "View departments",
                "View roles",
                "Update employee role",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add employee":
                    AddEmployee();
                    break;

                case "Add department":
                    AddDepartment();
                    break;

                case "Add role":
                    AddRole();
                    break;

                case "View employees":
                    ViewEmployees();
                    break;

                case "View departments":
                    ViewDepartments();
                    break;

                case "View roles":
                    ViewRoles();
                    break;

                case "Update employee role":
                    UpdateEmployeeRole();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function AddEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the first name of the employee?",
                name: "firstname"
            },
            {
                type: "input",
                message: "What's the last name of the employee?",
                name: "lastname"
            },
            {
                type: "input",
                message: "What is the employee's role id number?",
                name: "roleID"
            },
            {
                type: "input",
                message: "What is the manager id number?",
                name: "managerID"
            }
        ])
        .then(function (answer) {
            let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            connection.query(query, [answer.firstname, answer.lastname, answer.roleID, answer.managerID], function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            });
        });
}

function AddDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "What is the name of the department?",
            name: "departname"
        })
        .then(function (answer) {
            let query = "INSERT INTO department (name) VALUES (?)";
            connection.query(query, [answer.departname], function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            });
        });
}

function AddRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What's the name of the role?",
                name: "rolename"
            },
            {
                type: "input",
                message: "What is the salary for this role?",
                name: "salary"
            },
            {
                type: "input",
                message: "What is the department id number?",
                name: "departID"
            }
        ])
        .then(function (answer) {
            let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(query, [answer.rolename, answer.salary, answer.departID], function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            });
        });
}

function ViewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });

}

function ViewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

function ViewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });

}

function UpdateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "employeeUpdate"
            },

            {
                type: "input",
                message: "What do you want to update to?",
                name: "roleUpdate"
            }
        ])
        .then(function (answer) {
            let query = "UPDATE employee SET role_id=? WHERE first_name= ?";
            connection.query(query, [answer.roleUpdate, answer.employeeUpdate], function (err, res) {
                if (err) throw err;
                console.table(res);
                runSearch();
            });
        });
}



