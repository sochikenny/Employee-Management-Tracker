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