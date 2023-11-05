function byID(data) {
  async (req, res) => {
    try {
      const dbBookData = await Book.findByPk(req.params.id, {});

      const book = dbBookData.get({ plain: true });
      res.render("book", { book });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
}

const db = require("./config/index.js")

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
  db.query(`INSERT INTO roles (name) VALUES ("${data.name}")`);
  db.query("SELECT * FROM department", function (err, results) {
    console.log(results);
  });
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
};
