
const mysql = require("mysql2");
const connection = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'EmployeeTracker_db',
    },
    console.log(`Connected to the EmployeeTracker_db database.`)
  );

  connection.connect(function (err) {
    if (err) throw err;
  });

function addEmployee(data) {
  db.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${data.role_id}, ${data.manager_id} `
  );
  db.query("SELECT * FROM employee", function (err, results) {
    console.log(results);
  });
}

function viewEmployees(data) {
  db.query("SELECT * FROM employee", function (err, results) {
    console.log(results);
  });
}

function updateEmployee(data) {
  db.query(
    `UPDATE employee SET role_id = ${data.role_id} WHERE id = ${data.employee_id};`
  );
  db.query(
    "SELECT * FROM employee WHERE id=?",
    data.employee_id,
    function (err, results) {
      console.log(results);
    }
  );
}

function viewRoles(data) {
  db.query("SELECT * FROM roles", function (err, results) {
    console.log(results);
  });
}

function addRole(data) {
  db.query(
    `INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", "${data.salary}", "${data.department}")`
  );
  db.query("SELECT * FROM roles", function (err, results) {
    console.log(results);
  });
}

function viewDepartments(data) {
  db.query("SELECT * FROM department");
}

function addDepartment(data) {
  db.query(`INSERT INTO department (name) VALUES ("${data.name}")`);
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
  });
}

//dynamic role choices from database
function getRoles() {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, title FROM roles', (err, results) => {
        if (err) {
          return reject(error);
        }
        // map results into simple array
        const role = results.map(row => {
          return { name: `${row.title}`, value: row.id };
        });
        resolve(role);
      });
    });
  }
// dynamic employee choices to choose from
  function getEmployees() {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, first_name, last_name FROM employee', (err, results) => {
        if (err) {
          return reject(error);
        }
        // map results into simple array
        const employee = results.map(row => {
          return { name: `${row.first_name} ${row.last_name}`, value: row.id };
        });
        resolve(employee);
      });
    });
  }
//-----------------

// retrive departments to chose from 
function getDepartments() {
    return new Promise((resolve, reject) => {
     db.query('SELECT * FROM department', (err, results) => {
        if (err) {
          return reject(error);
        }
        // map results into simple array
        const departments = results.map(row => {
          return { name: `${row.name}`, value: row.id };
        });
        resolve(departments);
      });
    });
  }

  function fullEmployeeData(){
    db.query(`SELECT e.id, e.first_name, e.last_name, r.title, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
    FROM employee e
    JOIN roles r ON e.roles_id = r.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `, function (err, results) {
        if (err) console.error(err);
        else console.log(results);
    });
};  

function quit(data) {}

module.exports = {
  addEmployee,
  viewEmployees,
  updateEmployee,
  viewRoles,
  addRole,
  viewDepartments,
  addDepartment,
  getRoles,
  getEmployees,
  getDepartments,
  fullEmployeeData,
  quit
};
