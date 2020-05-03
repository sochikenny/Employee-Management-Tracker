INSERT INTO department (name)
VALUES ("Human Resources"), ("R&D"), ("Engineering"), ("Accounting"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUE ("manager", 120000.00, 2), ("engineer", 105000, 3), ("accountant", 75000, 4), ("recruiter", 65000, 1), ("sales associate", 50000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE ("Ikenna", "Nwajagu", 1, null), ("Tasha", "Hewitt", 1, 1), ("Ebuka", "Arinze", 3, 2), ("Alex", "Barthelemy", 5, 2);