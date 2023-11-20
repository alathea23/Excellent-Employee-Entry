const mysql = require("mysql2");
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "Remembrall23**",
    database: "EmployeeTracker_db",
  },
  console.log(`Connected to the EmployeeTracker_db database.`)
);

db.connect(function (err) {
  if (err) throw err;
});

async function addEmployee(data) {
  const newEmployee = db
    .promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first_name}", "${data.last_name}", ${data.role_id}, ${data.manager_id} )`
    );
  if (!newEmployee) {
    console.log("Employee not added");
    return;
  }
  const results = await db.promise().query("SELECT * FROM employee") 
    console.table(results[0]);
}

async function viewEmployees(data) {
  const results = await db.promise().query("SELECT * FROM employee");
  console.table(results[0]);
}

async function updateEmployee(data) {
  const results = await db
    .promise()
    .query(
      `UPDATE employee SET role_id = ${data.role_id} WHERE id = ${data.employee_id};`
    );
  db.query(
    "SELECT * FROM employee WHERE id=?",
    data.employee_id,
    function (err, results) {
      console.table(results[0]);
    }
  );
}

async function viewRoles(data) {
  const results = await db.promise().query("SELECT * FROM roles");
    console.table(results[0])
}

async function addRole(data) {
  const newRole = await db.promise().query(
    `INSERT INTO roles (title, salary, department_id) VALUES ("${data.title}", "${data.salary}", "${data.department_id}")`
  );
  if (!newRole) {
    console.log("Role not added");
    return;
  }
  const results =  await db.promise().query("SELECT * FROM roles")
  console.table(results[0]);
}

async function viewDepartments() {
  const results = await db.promise().query("SELECT * FROM department")
    console.table(results[0]);
}

async function addDepartment(data) {
  const newDepartment = await db.promise().query(`INSERT INTO department (name) VALUES ("${data.name}")`);
  if (!newDepartment) {
    console.log("Department not added");
    return
  }
  const results = await db.promise().query("SELECT * FROM department") 
    console.table(results[0]);
}

//dynamic role choices from database
function getRoles() {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, title FROM roles", (err, results) => {
      if (err) {
        return reject(err);
      }
      // map results into simple array
      const role = results.map((row) => {
        return { name: `${row.title}`, value: row.id };
      });
      resolve(role);
    });
  });
}
// dynamic employee choices to choose from
function getEmployees() {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, first_name, last_name FROM employee",
      (err, results) => {
        if (err) {
          return reject(err);
        }
        // map results into simple array
        const employee = results.map((row) => {
          return { name: `${row.first_name} ${row.last_name}`, value: row.id };
        });
        resolve(employee);
      }
    );
  });
}
//-----------------

// retrive departments to chose from
function getDepartments() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM department", (err, results) => {
      if (err) {
        return reject(err);
      }
      // map results into simple array
      const departments = results.map((row) => {
        return { name: `${row.name}`, value: row.id };
      });
      resolve(departments);
    });
  });
}

function fullEmployeeData() {
  db.query(
    `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name
    FROM employee e
    JOIN roles r ON e.roles_id = r.id
    LEFT JOIN employee m ON e.manager_id = m.id;
    `,
    function (err, results) {
      if (err) console.error(err);
      else console.table(results[0]);
    }
  );
}

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
  quit,
};
