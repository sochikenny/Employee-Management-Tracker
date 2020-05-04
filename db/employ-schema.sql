DROP DATABASE IF EXISTS Employee_TrackDB;
CREATE database Employee_TrackDB;

USE Employee_TrackDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY(department_id) REFERENCES department (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT, 
  PRIMARY KEY (id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  FOREIGN KEY(role_id) REFERENCES role(id)
);

INSERT INTO department (name)
VALUES ("Human Resources"), 
       ("R&D"), 
       ("Engineering"), 
       ("Accounting"), 
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 120000.00, 1), 
       ("engineer", 105000.00, 2), 
       ("accountant", 75000.00, 3), 
       ("recruiter", 65000.00, 4), 
       ("sales associate", 50000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ikenna", "Nwajagu", 1, 1), 
       ("Tasha", "Hewitt", 2, 2), 
       ("Ebuka", "Arinze", 3, 3), 
       ("Alex", "Barthelemy", 4, 4);
        



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

