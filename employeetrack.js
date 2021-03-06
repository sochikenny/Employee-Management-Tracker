const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const env = require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "Employee_TrackDB"
    
});

connection.connect(function (err) {
    if (err) throw err;
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
    let query = "SELECT title FROM Employee_TrackDB.role";
    connection.query(query, function (err, res) {
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
                    choices: function () {
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
                        role_id: roleArray.indexOf(answer.role) + 1,
                        manager_id: answer.managerID
                    },
                    function (err) {
                        if (err) throw err;
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
            connection.query(query, { name: answer.departname }, function (err, res) {
                if (err) throw err;
                runSearch();
            });
        });
}


function AddRole() {
    let query = "SELECT name FROM Employee_TrackDB.department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        let deptArray = [];

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
                    type: "rawlist",
                    choices: function () {
                        for (let i = 0; i < res.length; i++) {
                            deptArray.push(res[i].name);
                        }
                        return deptArray;
                    },
                    message: "What department would you like to add the new role to?",
                    name: "dept"
                },
            ])
            .then(function (answer) {
                let query = "INSERT INTO role SET?";
                connection.query(query,
                    {
                        title: answer.rolename,
                        salary: answer.salary,
                        department_id: deptArray.indexOf(answer.dept) + 1
                    },
                    function (err) {
                        if (err) throw err;
                        runSearch();
                    });
            });
    });
}


function ViewEmployees() {
    let query = "SELECT first_name AS FirstName , last_name as LastName , role.title as Role, role.salary AS Salary, department.name AS Department"; 
    query += " FROM employee INNER JOIN department ON department.id = employee.role_id left JOIN role ON role.id = employee.role_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });

}

function ViewDepartments() {
    let query = "SELECT name AS Department FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    });
}

function ViewRoles() {
    let query = "SELECT title AS Role FROM role";
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



