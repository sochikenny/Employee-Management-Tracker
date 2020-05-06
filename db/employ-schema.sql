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
VALUES ("Legal"), 
       ("Technology"), 
       ("Accounting"), 
       ("Recruiting"),
       ("Sales");


INSERT INTO role (title, salary, department_id)
VALUES ("Lead Counsel", 150000.00, 1),
       ("Associate Counsel", 105000.00, 1),
       ("Engineer", 110000.00, 2), 
       ("Senior Engineer", 125000.00, 2),
       ("Accountant", 75000.00, 3),
       ("Senior Accountant", 85000.00, 3),
       ("Lead Recruiter", 70000.00, 4), 
       ("Recruiter", 55000.00, 4),
       ("Sales Associate", 50000.00, 5),
       ("Sales Associate", 50000.00, 5);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ikenna", "Nwajagu", 1), 
       ("Tasha", "Hewitt", 1), 
       ("Ebuka", "Arinze", 2), 
       ("Alex", "Barthelemy", 3),
       ("Nathan", "Abraham", 3),
       ("Tobes", "Nwajagu", 4),
       ("Barack", "Obama", 5);
       
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;



