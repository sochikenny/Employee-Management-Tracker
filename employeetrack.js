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
    console.log("connected as id " + connection.threadId);
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
    let query = "SELECT title FROM Employee_TrackDB.role;";
    connection.query(query, function(err, res) {
        if (err) throw err;
        let roleArray = [];
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
                type: "rawlist",
                choices: function() {
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                },
                message: "What is the employee's role?",
                name: "role",
            },
            {
                type: "input",
                message: "What is the employer's manager ID #?",
                name: "managerID"
            }
        ])
        .then(function (answer) {
            let query = "INSERT INTO employee SET ?";
            connection.query(query, 
                {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: roleArray.indexOf(answer.role)+1,
                manager_id: answer.managerID
              });
              
              runSearch();
        });
    });
}

function AddDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "What is the name of the department you'd like to add?",
            name: "departname"
        })
        .then(function (answer) {
            let query = "INSERT INTO department SET?";
            connection.query(query, {name: answer.departname}, function (err, res) {
                if (err) throw err;
                console.table("Department Created Successfully!");
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



