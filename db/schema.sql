DROP DATABASE IF EXISTS EmployeeTracker_db;

CREATE DATABASE EmployeeTracker_db;

USE EmployeeTracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
); -- Removed the comma

CREATE TABLE roles ( -- 'roles' instead of 'role' to match your foreign key statement
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT, -- Define 'department_id' column
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
); -- Correct table reference and no trailing comma

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT, -- Define 'role_id' column
  manager_id INT, -- Define 'manager_id' column to reference 'employee(id)'
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE, -- Correct table name and add comma
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
); -- Correct foreign key syntax