INSERT INTO department (name)
VALUES ("Shipping"),
       ("Purchasing"),
       ("Sales");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 80000, 2),
("Buyer", 50000, 2),
("Box-Handler", 45000, 1),
("Sales Representative", 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sally", "Westlow", 2, NULL),
("Adam", "Garcia", 1, NULL),
("Peter", "Ruvnic", 3, NULL);